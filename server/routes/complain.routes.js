const express = require("express");
const multer = require("multer");
const path = require("path");
const Complaint = require("../models/Complaint");
const User = require("../models/User");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('./public/uploads'));
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single("photo");

// form submission
router.post("/complain",upload, async (req, res) => {
  try {
    const { id, name, phone, address, description, fieldType } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : "";

    const ComplaintData = new Complaint({
      id,
      name,
      phone,
      address,
      description,
      photo,
      fieldType,
    });

    await ComplaintData.save();

    res.status(200).json({ message: "Complaint submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit complaint" });
  }
});

router.get('/upcoming-work', async (req, res) => {
  const userId = req.query.userId; 
  try {
    const user = await User.findById(userId);
    if (user.isVendor) {
      const upcomingWork = await Complaint.find({
        fieldType: user.fieldsOfExpertise,
      }); 
      return res.json(upcomingWork);
    } 

    const upcomingWork = await Complaint.find({id: userId}); 
    res.json(upcomingWork);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch upcoming work data' });
  }
});

router.put("/work-status", async (req, res) => {
  const {
    workId,
    status,
    vendorName,
    serviceType,
    serviceCharges,
    taxAmount,
    totalAmount,
    taxRate,
  } = req.body;

  try {

    if (!serviceCharges && !taxAmount && !totalAmount && !taxRate) {
      const updatedWork = await Complaint.findByIdAndUpdate(workId, {
        status,
        vendorName,
        serviceType,
      });
      res.status(200).json(updatedWork);
    }

    const updatedWork = await Complaint.findByIdAndUpdate(workId, {
      status,
      vendorName,
      serviceType,
      serviceCharges,
      taxAmount,
      totalAmount,
      taxRate,
    });
    res.status(200).json(updatedWork);
  } catch (error) {
    res.status(500).json({ message: "Error updating work status" });
  }
});


module.exports = router;