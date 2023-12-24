const express = require("express");
const router = express.Router();

const user = require("../controller/user.controller");
const verifyToken = require("../middleware/token.verify.middleware");

router.post("/login", user.login);
router.post("/register", user.register);
router.post("/logout", verifyToken, user.logout);
router.post("/cookie_token", verifyToken, user.cookie_token);
router.post("/refresh", user.refresh);

module.exports = router;
