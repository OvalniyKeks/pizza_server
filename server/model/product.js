const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  top: {
    type: String,
    required: true
  },
  new: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  modificators: {
    type: String,
    required: true
  },
  compound: {
    type: String,
    required: true
  },
  categoryId: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Product', productSchema)
