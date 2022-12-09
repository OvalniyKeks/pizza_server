const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  number: {
    type: String,
    required: false
  },
  products: {
    type: String,
    required: false
  },
  contacts: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: false
  },
  restaraunt: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  delivery_time: {
    type: String,
    required: false
  },
  pay: {
    type: String,
    required: false
  },
  tip: {
    type: String,
    required: false
  },
  comment: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: false
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Order', orderSchema)
