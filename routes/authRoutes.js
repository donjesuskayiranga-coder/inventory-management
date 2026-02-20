const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const User = require("../models/user");
const router = express.Router();
const { register, login} = require("../controllers/authController");
router.post("/register",register);

router.post("/login",login);

router.get("/protected",auth, (req,res) => {
    res.json({message: `Hello user ${req.user.id}`});
});

router.get("/users", auth, admin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }

});

module.exports = router;