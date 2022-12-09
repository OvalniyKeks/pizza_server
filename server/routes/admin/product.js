const express = require('express')
const router = express.Router()
const Product = require('../../model/product')

router.get('/all', async (req, res) => {
  try {
    const arr = await Product.find().lean()
    res.status(200).json(arr)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', getProduct, (req, res) => {
  res.status(200).json(res.product)
})

router.post('/add', async (req, res) => {
  const productObj = {}
  const body = req.body
  const file = req.files
  if (file) {
    file.image.mv('server/uploads/products/' + file.image.name)
    productObj.image = `http://localhost:5000/${file.image.name}`
  }

  for (const key in body) {
    if (body[key]) {
      productObj[key] = body[key]
    }
  }
  const product = new Product(productObj)
  try {
    await product.save()
    res.status(200).json({ message: 'Продукт успешно добавлен!' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.patch('/:id', getProduct, async (req, res) => {
  try {
    const file = req.files
    if (file) {
      file.image.mv('server/uploads/products/' + file.image.name)
      res.product.image = `http://localhost:5000/${file.image.name}`
    }

    Object.assign(res.product, req.body)
    await res.product.save()
    res.status(200).json({ message: 'Продукт обновлен' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete('/:id', getProduct, async (req, res) => {
  try {
    await res.product.remove()
    res.status(200).json({ message: 'Страница удалена' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getProduct (req, res, next) {
  try {
    const product = await Product.findOne({ _id: req.params.id }).exec()
    if (product === null) {
      return res.status(404).json({ message: 'Страницы не существует' })
    } else {
      res.product = product
      next()
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = router
