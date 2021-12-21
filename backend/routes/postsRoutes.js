const express = require("express");
const postsControllers = require("../controllers/postsControllers");
const router = express.Router();

router.route("/").get(postsControllers.getAllPosts);
router.route("/").post(postsControllers.createPost);
router.route("/:id").delete(postsControllers.deletePost);

module.exports = router;
