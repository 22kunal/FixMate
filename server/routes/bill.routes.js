const express = require("express");
const Bill = require("../models/Bill");
const router = express.Router();

router.post("/create", async (req, res) => {
  const {
    serviceCharges,
    taxAmount,
    totalAmount,
    taxRate,
    serviceType,
    serviceDescription,
    vendorName,
    customerName,
    customerPhone,
  } = req.body;

  if (!serviceCharges || serviceCharges <= 0) {
    return res.status(400).json({ message: "Invalid service charges" });
  }

  const existingBill = await Bill.findOne({
    taxRate,
    serviceType,
    serviceDescription,
    vendorName,
    customerName,
    customerPhone,
  });

  try {

    if (existingBill) {
      existingBill.serviceCharges = serviceCharges;
      existingBill.taxAmount = taxAmount;
      existingBill.totalAmount = totalAmount;

      const updatedBill = await existingBill.save();

      return res.status(200).json({
        message: "Bill updated successfully",
        bill: updatedBill,
      });
    } 
    const newBill = new Bill({
      taxAmount,
      totalAmount,
      serviceCharges,
      taxRate,
      serviceType,
      serviceDescription,
      vendorName,
      customerName,
      customerPhone,
      status: "pending",
    });

    const savedBill = await newBill.save();
    return res.status(201).json({ message: "Bill created successfully", bill: savedBill });
  } catch (error) {
    console.error("Error creating bill:", error);
    res.status(500).json({ message: "Failed to create bill" });
  }
});


module.exports = router;