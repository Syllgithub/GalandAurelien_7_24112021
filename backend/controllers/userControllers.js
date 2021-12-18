const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.login = async (req, res, next) => {
  const [user, _] = await User.findByEmail(req.body.email);

  if (user[0] == undefined) {
    return res.status(401).json({ error: "Utilisateur non trouvé !" });
  } else {
    bcrypt.compare(req.body.password, user[0].password).then((valid) => {
      if (!valid) {
        return res.status(401).json({ error: "Mot de passe incorrect !" });
      }
      res.status(200).json({
        userId: user[0].id,
        token: jwt.sign({ userId: user[0].id }, "PZCTBIKQDOE", {
          expiresIn: "24h",
        }),
      });
    });
  }
};

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    let user = new User(
      req.body.lastname,
      req.body.firstname,
      req.body.email,
      hash
    );
    user = user.save();
    res.status(201).json({ message: "Utilisateur créé !" });
  });
};

exports.profile = async (req, res, next) => {
  console.log(req.params.id);
  if (req.params.id) {
    const [user, _] = await User.findById(req.params.id);
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, "PZCTBIKQDOE");
    const userId = decodedToken.userId;
    res.status(201).json({ user: user[0], userId: userId });
  } else {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, "PZCTBIKQDOE");
    const userId = decodedToken.userId;
    const [user, _] = await User.findById(userId);
    console.log(user[0]);
    res.status(201).json({ user: user[0], userId: userId });
  }
};

exports.modifyProfile = async (req, res, next) => {
  console.log(req.file);
  const userinfos = JSON.parse(req.body.user);
  console.log(userinfos);
  if (req.file) {
    if (!userinfos.userPic) {
      const user = {
        id: req.params.id,
        lastname: userinfos.lastname,
        firstname: userinfos.firstname,
        email: userinfos.email,
        bio: userinfos.bio,
        userPic: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      };
      await User.updateUser(user);
    } else {
      const previousUserPic = userinfos.userPic.split("/images/")[1];
      fs.unlink(`images/${previousUserPic}`, () => {
        const user = {
          id: req.params.id,
          lastname: userinfos.lastname,
          firstname: userinfos.firstname,
          email: userinfos.email,
          bio: userinfos.bio,
          userPic: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        };
        User.updateUser(user);
      });
    }
  } else {
    const user = {
      id: req.params.id,
      lastname: userinfos.lastname,
      firstname: userinfos.firstname,
      email: userinfos.email,
      bio: userinfos.bio,
      userPic: userinfos.userPic,
    };
    await User.updateUser(user);
  }

  res.status(201).json({ message: "Utilisateur modifié !" });
};
