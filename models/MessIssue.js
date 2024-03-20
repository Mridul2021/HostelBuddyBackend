const mongoose = require('mongoose');

const MessIssueSchema = new mongoose.Schema({
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
  mailVIT: {
    type: String,
    required: true,
    trim: true,
    lowercase: true, // Store emails in lowercase for consistency
    match: /^\S+@\S+\.\S+$/, // Basic email format validation
  },
  messType: {
    type: String,
    required: true,
    trim: true,
  },
  messBlock: {
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

const Partner = mongoose.model('MessIssue', MessIssueSchema);

module.exports = Partner;
