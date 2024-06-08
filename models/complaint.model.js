const mongoose = require('mongoose')

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  photos: {
    type: [],
    required: false,
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low',
    required: true,
  },
  hostelId: {
    type: String,
    required: true,
  },
  studentId: {
    type:String,
    required: false,
  },
  trackingStatus: {
    type:String,
    enum: ['submitted', 'resolved'],
    default: 'submitted',
    required: true,
  },
  reply:{
    type: String,
    required: false
  },
  status: {
    type: Number,
    min: 0,
    max: 1,
    default: 1,
    required: true,
  }, 
  }, {timestamps: true})

module.exports = mongoose.model('Complaint', complaintSchema)
