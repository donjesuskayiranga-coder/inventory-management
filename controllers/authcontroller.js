const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
console.log("JWT_EXPIRES_IN =", process.env.JWT_EXPIRES_IN);


exports.register = async (req,res) => {
    try {
        const {username, email, password} =req.body;

        const userExists = await User.findOne({ email});
        if (userExists) {
            return res.status(400).json({message: "User already exists"});
        }

        const user = await User.create({
            username, 
            email, 
            password
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id : user._id,
                username: user.username,
                email:user.email,

            },
        });

    } catch (error) {
        res.status(500).json({message: error.message});

    }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,  
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
