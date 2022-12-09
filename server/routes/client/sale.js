const express = require('express')
const router = express.Router()
const Sale = require('../../model/sale')

router.get('/', async (req, res) => {
  try {
    const arr = await Sale.find().lean()
    res.status(200).json(arr)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
