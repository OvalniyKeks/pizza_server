const express = require('express')
const router = express.Router()
const Category = require('../../model/category')

router.get('/all', async (req, res) => {
  try {
    const arr = await Category.find().lean()
    res.status(200).json(arr)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', getCategory, (req, res) => {
  res.status(200).json(res.category)
})

router.post('/add', async (req, res) => {
  const categoryObj = {}
  const body = req.body
  const file = req.files
  if (file) {
    file.image.mv('server/uploads/categories/' + file.image.name)
    categoryObj.image = `http://localhost:5000/${file.image.name}`
  }

  for (const key in body) {
    if (body[key]) {
      categoryObj[key] = body[key]
    }
  }
  const category = new Category(categoryObj)
  try {
    await category.save()
    res.status(200).json({ message: 'Категория успешно добавлена!' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.patch('/:id', getCategory, async (req, res) => {
  try {
    const file = req.files
    if (file) {
      file.image.mv('server/uploads/categories/' + file.image.name)
      res.category.image = `http://localhost:5000/${file.image.name}`
    }

    Object.assign(res.category, req.body)
    await res.category.save()
    res.status(200).json({ message: 'Категория обновлена' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete('/:id', getCategory, async (req, res) => {
  try {
    await res.category.remove()
    res.status(200).json({ message: 'Страница удалена' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getCategory (req, res, next) {
  try {
    const category = await Category.findOne({ _id: req.params.id }).exec()
    if (category === null) {
      return res.status(404).json({ message: 'Страницы не существует' })
    } else {
      res.category = category
      next()
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = router
