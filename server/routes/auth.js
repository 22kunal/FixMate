const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const router = express.Router();

// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER, // Your email address
//     pass: process.env.EMAIL_PASS, // Your email password or app password
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// Generate random OTP
function generateOTP() {
  return (Math.random() * 4).toString();
}

// Sign Up
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // const otp = generateOTP();
    const user = new User({ name, email, password, isVerified: false });
    // const user = new User({ name, email, password });
    await user.save();

    // Send OTP email
    // transporter.sendMail({
    //   from: process.env.EMAIL_USER,
    //   to: user.email,
    //   subject: "Verify your email address",
    //   text: `<p>Your OTP code is: <b>${otp}</b></p>`,
    // });

    res.status(201).json({ message: "User registered, please verify your email."});
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

    //  if (!user.isVerified) {
    //   return res.status(403).json({ error: "Please verify your email to log in." });
    // }

    const token = jwt.sign({ id: user._id,name:user.name }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const name = user.name;
    res.json({ token,name });
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
  res.json({ name: req.user.name }); 
});

// Verify email
// router.post("/verify-otp", async (req, res) => {
//   const { email, otp } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ error: "User not found." });
//     }

//     if (user.isVerified) {
//       return res.status(400).json({ message: "User already verified." });
//     }

//     if (user.otp !== otp) {
//       return res.status(400).json({ error: "Invalid OTP." });
//     }

//     // Verify the user's email
//     user.isVerified = true;
//     await user.save();

//     res.json({ message: "Email verified successfully!" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


module.exports = router;
