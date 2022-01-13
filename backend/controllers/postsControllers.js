const Posts = require("../models/Posts");
const jwt = require("jsonwebtoken");

exports.createPost = async (req, res, next) => {
  // lire depuis le token
  let post = new Posts(req.body.userId, req.body.content);
  try {
    post = await post.save();
  } catch (err) {
    console.log(err);
  }
  res.status(201).json({ message: "Post créé !" });
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
  await Posts.deletePost(req.params.id);
  res.status(201).json({ message: "Post supprimé !" });
};
