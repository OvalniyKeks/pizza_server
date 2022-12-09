const mongoose = require('mongoose')

const saleSchema = new mongoose.Schema({
  image: {
    type: String,
    required: false
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Sale', saleSchema)
