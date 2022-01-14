const Posts = require("../models/Posts");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.createPost = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, "PZCTBIKQDOE");
    const userId = decodedToken.userId;

    let post = new Posts(userId, req.body.content);
    try {
      post = await post.save();
    } catch (err) {
      console.log(err);
    }
    res.status(201).json({ message: "Post créé !" });
  } catch (err) {
    res.status(401).json({ error: err | "Requete non authentifiée !" });
  }
};

exports.getAllPosts = async (req, res, next) => {
  let [result, _] = await Posts.getAllPosts();
  let posts = [];
  let previousPostId = -1;
  let previousPostIdInPosts = -1;

  for (let i = 0; i < result.length; i++) {
    let line = result[i];
    let post;

    if (line.postID != previousPostId) {
      const [userInfos, __] = await Posts.getUsernameByPostId(line.postUserID);
      post = {
        userLastname: userInfos[0].lastname,
        userFirstname: userInfos[0].firstname,
        userPic: userInfos[0].userPic,
        postId: line.postID,
        postUserID: line.postUserID,
        postContent: line.postContent,
        postDate: line.postDate,
        comments: [],
      };

      posts.push(post);

      previousPostIdInPosts = posts.length - 1;
    } else {
      post = posts[previousPostIdInPosts];
    }
    if (line.commentId != null) {
      post.comments.push({
        commentId: line.commentId,
        commentLastname: line.commentLastname,
        commentFirstname: line.commentFirstname,
        commentUserPic: line.commentUserPic,
        commentPostId: line.commentPostID,
        commentUserId: line.commentUserID,
        commentContent: line.commentContent,
      });
    }
    previousPostId = line.postID;
  }
  res.status(201).json({ posts: posts });
};

exports.getUserIdPosts = async (req, res, next) => {
  const [posts, _] = await Posts.getPostsByUserId(req.params.id);

  res.status(201).json({ posts: posts });
};

exports.deletePost = async (req, res, next) => {
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, "PZCTBIKQDOE");
  const userId = decodedToken.userId;

  const [user, _] = await User.findById(userId);
  const [post, __] = await Posts.findPostById(req.params.id);

  if (post[0].userId == userId || user[0].isAdmin == 1) {
    await Posts.deletePost(req.params.id);
    res.status(201).json({ message: "Post supprimé !" });
  } else {
    res.status(401).json({ error: "Requete non autorisée !" });
  }
};
