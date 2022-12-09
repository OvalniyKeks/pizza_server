const express = require('express')
const router = express.Router()
const Order = require('../../model/order')

router.get('/', async (req, res) => {
  try {
    const arr = await Order.find().lean()
    res.status(200).json(arr)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  const orderObj = {}
  const body = req.body

  for (const key in body) {
    if (body[key]) {
      orderObj[key] = body[key]
    }
  }

  orderObj.number = '1'

  const order = new Order(orderObj)
  try {
    await order.save()
    res.status(200).json({ data: { id: orderObj.number }, message: 'Заказ принят!' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
