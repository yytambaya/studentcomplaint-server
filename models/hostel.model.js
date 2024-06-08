const mongoose = require('mongoose')

const hostelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    min: 0,
    max: 1,
    default: 1,
    required: true,
  }, 
  }, {timestamps: true})

module.exports = mongoose.model('Hostel', hostelSchema)
