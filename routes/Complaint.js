const express = require("express");
const router = express.Router();
const multer = require('multer');
const partnerWithUs = require('../models/Complaint');
const { transporter } = require("../keys/email_transporter");

// Multer Configuration
const storage = multer.diskStorage({
  destination: './files',
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use file.originalname to store only the filename
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

// Function to generate a random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Map to store OTPs corresponding to email addresses
const otpMap = new Map();

router.post("/api/postComplaint", upload.single('file'), async (req, res) => {
  // Retrieve file name if uploaded
  const fileName = req.file ? req.file.originalname : null;

  // Create a new partnerWithUs instance including the file name
  const newPartner = {
    ...req.body,
    filePath: fileName,
  };

  try {
    const { mailVIT } = req.body;

    // Generate OTP
    const otp = generateOTP();

    // Store OTP in the map
    otpMap.set(mailVIT, otp);

    // Define email options with OTP
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: mailVIT,
      subject: "OTP for Hostel Buddy complaint",
      text: `Your OTP for is: ${otp}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Send success response
    res.status(200).json({ message: "OTP sent to email. Please provide OTP to proceed." });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/api/verifyComplaintOTP", async (req, res) => {
  try {
    const { mailVIT, otp } = req.body;

    // Retrieve OTP from the map
    const storedOTP = otpMap.get(mailVIT);
    
    console.log("Stored OTP:", storedOTP);
    console.log("Received OTP:", otp);

    // Check if OTP matches
    if (otp && storedOTP && otp.toString() === storedOTP.toString()) {
      // Clear OTP from the map
      otpMap.delete(mailVIT);

      // Proceed with partner creation and email sending
      const fileName = req.file ? req.file.originalname : null;
      const newPartner = {
        ...req.body,
        filePath: fileName,
      };
      const users = await partnerWithUs.create(newPartner);

      // Define email options
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: mailVIT,
        subject: "Thanks for contacting us",
        text: "Thanks for reaching out to us. Your issue will be resolved soon!",
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      // Send the response after both operations are completed
      res.status(200).json(users);
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP or creating partner:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/api/getComplaint", (req, res) => {
  partnerWithUs.find()
    .then(partners => res.json(partners))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
