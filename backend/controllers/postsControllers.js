const Posts = require("../models/Posts");

exports.createPost = async (req, res, next) => {
  console.log(req.body.userId);
  console.log(req.body.content);
  let post = new Posts(
    req.body.userId,
    req.body.userLastname,
    req.body.userFirstname,
    req.body.userProfilePic,
    req.body.content
  );
  try {
    post = await post.save();
  } catch (err) {
    console.log(err);
  }
  res.status(201).json({ message: "Post créé !" });
};

exports.getAllPosts = async (req, res, next) => {
  const [posts, _] = await Posts.getAllPosts();
  res.status(201).json({ posts: posts });
};

exports.deletePost = async (req, res, next) => {
  console.log(req.params.id);
  await Posts.deletePost(req.params.id);
  res.status(201).json({ message: "Post supprimé !" });
};
