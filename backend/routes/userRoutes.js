const express = require("express");
const userControllers = require("../controllers/userControllers");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.route("/login").post(userControllers.login);
router.route("/signup").post(userControllers.signup);
router.route("/profile/").get(auth, userControllers.profile);
router.route("/profile/:id").get(auth, userControllers.profile);
router.route("/profile/:id").put(auth, multer, userControllers.modifyProfile);
router.route("/profile/:id").delete(auth, userControllers.deleteUser);

module.exports = router;
