const express = require("express");
const Complaint = require("../models/Complaint");

const router = express.Router();

// form submission
router.post("/complain", async (req, res) => {
  try {
    const { name, phone, address, description } = req.body;
    let photo;
    
    if (req.file) {
      photo = req.file.path; 
    }

    const complaintData = new Complaint({
      name,
      phone,
      address,
      description,
      photo,
    });

    await complaintData.save();

    res.status(200).json({ message: "Complaint submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit complaint" });
  }
});

// GET endpoint to fetch upcoming work data
router.get('/upcoming-work', async (req, res) => {
  try {
      const upcomingWork = await Complaint.find(); 
    res.json(upcomingWork);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch upcoming work data' });
  }
});

module.exports = router;
