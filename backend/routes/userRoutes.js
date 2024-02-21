const express = require("express");
const {
    registerUser,
    authUser,
    allUsers,
    forgotPassword,
    resetPassword,
    SocialAuthUser,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.post("/socialAuth", SocialAuthUser);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword", resetPassword);

module.exports = router;