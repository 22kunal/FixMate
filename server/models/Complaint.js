const mongoose = require("mongoose");

const ComplainSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Complaint", ComplainSchema);
