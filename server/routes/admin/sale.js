const express = require('express')
const router = express.Router()
const Sale = require('../../model/sale')

router.get('/all', async (req, res) => {
  try {
    const arr = await Sale.find().lean()
    res.status(200).json(arr)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', getSale, (req, res) => {
  res.status(200).json(res.sale)
})

router.post('/add', async (req, res) => {
  const saleObj = {}
  const body = req.body
  const file = req.files
  if (file) {
    file.image.mv('server/uploads/sale/' + file.image.name)
    saleObj.image = `http://localhost:5000/${file.image.name}`
  }

  for (const key in body) {
    if (body[key]) {
      saleObj[key] = body[key]
    }
  }
  const sale = new Sale(saleObj)
  try {
    await sale.save()
    res.status(200).json({ message: 'Акция успешно добавлена!' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.patch('/:id', getSale, async (req, res) => {
  try {

    const file = req.files
    if (file) {
      file.image.mv('server/uploads/sale/' + file.image.name)
      res.sale.image = `http://localhost:5000/${file.image.name}`
    }

    await res.sale.save()
    res.status(200).json({ message: 'Акция обновлена' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete('/:id', getSale, async (req, res) => {
  try {
    await res.sale.remove()
    res.status(200).json({ message: 'Акция удалена' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getSale (req, res, next) {
  try {
    const sale = await Sale.findOne({ _id: req.params.id }).exec()
    if (sale === null) {
      return res.status(404).json({ message: 'Акции не существует' })
    } else {
      res.sale = sale
      next()
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = router
