const mongoose = require('mongoose');

const roomCleaningSchema = new mongoose.Schema({
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
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  }
});

const Partner = mongoose.model('roomCleaning', roomCleaningSchema);

module.exports = Partner;
