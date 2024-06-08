const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['newStudent', 'newComplaint'],
    required: true,
  },
  hostelId: {
    type:String,
    required: false,
  },
  status: {
    type: Number,
    min: 0,
    max: 1,
    default: 1,
    required: true,
  }, 
  }, {timestamps: true})

module.exports = mongoose.model('Notification', notificationSchema)
