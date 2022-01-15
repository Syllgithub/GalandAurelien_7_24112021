const User = require("../models/User");
const Post = require("../models/Posts");
const bcrypt = require("bcrypt"); // Utilisation de bcrypt pour hasher les mots de passes
const jwt = require("jsonwebtoken"); // Utilisation de jwt pour créer un token d'authentification
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
      hash,
      req.body.isAdmin
    );
    user = user
      .save()
      .then(() => {
        res.status(201).json({ message: "Utilisateur créé !" });
      })
      .catch((err) => {
        if (err.errno == 1062) {
          // L'erreur 1062 correspond a une duplication d'entrée
          let message = "L'adresse email est déjà utilisée.";
          res.status(400).json({ error: message });
        } else res.status(401).json({ err });
      });
  });
};

exports.profile = async (req, res, next) => {
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
    res.status(201).json({ user: user[0], userId: userId });
  }
};

exports.modifyProfile = async (req, res, next) => {
  const userinfos = JSON.parse(req.body.user);
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
      // Refaire requete sql pour userPic + refacto
      const [userReq, _] = await User.findById(req.params.id);
      const previousUserPic = userReq[0].userPic.split("/images/")[1];

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
      fs.unlink("images/" + previousUserPic, () => {});
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

exports.deleteUser = async (req, res, next) => {
  const [userReq, _] = await User.findById(req.params.id);
  // On vérifie si l'utilisateur a une photo de profil pour la supprimer
  if (userReq[0].userPic) {
    const previousUserPic = userReq[0].userPic.split("/images/")[1];
    fs.unlink("images/" + previousUserPic, () => {});
  }
  await Post.deletePostsByUserId(req.params.id);
  await User.deleteUser(req.params.id);

  res.status(201).json({ message: "Utilisateur supprimé !" });
};
