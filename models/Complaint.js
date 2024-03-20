const mongoose = require('mongoose');

const PartnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  regNo: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  selectedBlock: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  roomNo: {
    type: String,
    required: true,
    trim: true,
    match: /^[0-9]+$/, // Only allow numerical values
  },
  mailVIT: {
    type: String,
    required: true,
    trim: true,
    lowercase: true, // Store emails in lowercase for consistency
    match: /^\S+@\S+\.\S+$/, // Basic email format validation
  },
  issueType: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  }
});

const Partner = mongoose.model('Partner', PartnerSchema);

module.exports = Partner;
