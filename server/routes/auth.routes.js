const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Sign Up
router.post("/signup", async (req, res) => {
  const {
    name,
    email,
    password,
    isVendor,
    yearsOfExperience,
    fieldsOfExpertise,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Account already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
      isVendor,
      yearsOfExperience: isVendor ? yearsOfExperience : undefined,
      fieldsOfExpertise: isVendor ? fieldsOfExpertise : undefined,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered" });
    console.log("User registered");
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err.message);
  }
});
// Sign In
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        isVendor: user.isVendor, 
        fieldsOfExpertise: user.isVendor ? user.fieldsOfExpertise : "",
        isAdmin: user.isAdmin? user.isAdmin : false,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    
    return res.status(200).json({
      token,
      name: user.name,
      isVendor: user.isVendor,
      id: user._id,
      fieldsOfExpertise: user.isVendor ? user.fieldsOfExpertise : "",
      isAdmin: user.isAdmin? user.isAdmin : false,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middleware to check JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Token validation route
router.post('/validate', authenticateToken, (req, res) => {
  res.json(
    { name: req.user.name,
      id: req.user.id,
      isVendor: req.user.isVendor,
      fieldsOfExpertise: req.user.fieldsOfExpertise,
      isAdmin: req.user.isAdmin,
    }
  ); 
});



module.exports = router;
