const Comments = require("../models/Comments");
const User = require("../models/User");
const jwt = require("jsonwebtoken"); // Utilisation de jwt pour décoder le token user

exports.createComment = async (req, res, next) => {
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, "PZCTBIKQDOE");
  const userId = decodedToken.userId;

  let comment = new Comments(req.body.postId, userId, req.body.content);

  comment = await comment.save();

  res.status(201).json({ message: "Commentaire créé !" });
};

exports.deleteComment = async (req, res, next) => {
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, "PZCTBIKQDOE");
  const userId = decodedToken.userId;

  const [user, _] = await User.findById(userId);
  const [comment, __] = await Comments.findCommentById(req.params.id);

  if (comment[0].userId == userId || user[0].isAdmin == 1) {
    await Comments.deleteComment(req.params.id);
    res.status(200).json({ message: "Commentaire supprimé !" });
  } else {
    res.status(401).json({ error: "Requete non autorisée !" });
  }
};
