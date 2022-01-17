const express = require("express");
const commentsControllers = require("../controllers/commentsControllers");
const router = express.Router();

router.route("/").post(commentsControllers.createComment);
router.route("/:id").put(commentsControllers.updateComment);
router.route("/:id").delete(commentsControllers.deleteComment);

module.exports = router;
