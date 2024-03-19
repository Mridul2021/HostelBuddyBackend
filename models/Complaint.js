const mongoose = require('mongoose');

const PartnerSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  RegNo: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  Block: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  RoomNo: {
    type: String,
    required: true,
    trim: true,
    match: /^[0-9]+$/, // Only allow numerical values
  },
  mailId: {
    type: String,
    required: true,
    trim: true,
    lowercase: true, // Store emails in lowercase for consistency
    unique: true, // Ensure unique email addresses
    match: /^\S+@\S+\.\S+$/, // Basic email format validation
  },
  IssueType: {
    type: String,
    required: true,
    trim: true,
  },
  Description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  }
});

const Partner = mongoose.model('Partner', PartnerSchema);

module.exports = Partner;
