const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Category', categorySchema)
