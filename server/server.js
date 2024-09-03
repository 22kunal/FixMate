const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const formSubmission = require("./routes/submission");
require("dotenv").config({path: "./.env.local"});
const cors = require("cors");

const app = express();
app.use(cors());

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", formSubmission);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
