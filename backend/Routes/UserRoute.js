const express = require("express");
const router = express.Router();

const { registerUser, loginUser, updateUser, deleteUser, getMe } = require("../Controller/UserController");
const UserAuth = require("../Middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", UserAuth, getMe);
router.put("/update/:id", UserAuth, updateUser);
router.delete("/delete/:id", UserAuth, deleteUser);

module.exports = router;