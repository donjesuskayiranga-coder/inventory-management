const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const { register, login} = require("../controllers/authController");

router.post("/register",register);

router.post("/login",login);
router.get("/protected",auth, (req,res) => {
    res.json({message: `Hello user ${req.user.id}`});
});

module.exports = router;