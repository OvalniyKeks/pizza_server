// Маршруты для модели Page для обработки запросов с фронта.
const express = require('express')
const router = express.Router()
const Page = require('../model/page')

// Вывод всех динамических страниц сайта.
router.get('/', async (req, res) => {
  try {
    // Выбираем только нужны поля, чтобы в запросе не передавались лишние данные.
    const pages = await Page.find().select('h1 url -_id').sort('h1').lean()
    res.status(200).json(pages)
  } catch (err) {
    // Если возникает проблема, то возвращаем ошибку сервера.
    res.status(500).json({ message: err.message })
  }
})

// Получает контент конкретной страницы. Выносим повторяющиеся действия в функцию getPage для упрощения кода.
router.get('/:url', getPage, (req, res) => {
  res.json(res.page)
})

router.get('/search/:search', searchPage, (req, res) => {
  res.json(res.page)
})

// Публикация новой страницы.
router.post('/', async (req, res) => {
  const page = new Page({
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
    code: req.body.code,
    tags: req.body.tags
  })
  try {
    await page.save()
    res.status(200).json({ message: 'Страница создана' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Обновление контента конкретной страницы.
router.patch('/:url', getPage, async (req, res) => {
  try {
    Object.assign(res.page, req.body)
    await res.page.save()
    res.status(200).json({ message: 'Страница обновлена' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Удаление конкретной страницы.
router.delete('/:url', getPage, async (req, res) => {
  try {
    await res.page.remove()
    res.status(200).json({ message: 'Страница удалена' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Функция для поиска конкретной страницы по URL.
async function getPage (req, res, next) {
  try {
    // Ищем страницу по URL, который указан в строке запроса.
    const page = await Page.findOne({ url: req.params.url }).exec()
    if (page === null) {
      // Возвращаем 404 ответ сервера, если страница не найдена.
      return res.status(404).json({ message: 'Страницы не существует' })
    } else {
      // Передаём контент страницы, если URL найден.
      res.page = page
      next()
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

async function searchPage (req, res, next) {
  try {
    console.log(req.params.search)
    const query = { $text: { $search: req.params.search } }

    const projection = {
      _id: 0,
      title: 1,
      url: 1,
      code: 1,
      description: 1,
      tags: 1
    }

    // find documents based on our query and projection
    const pages = await Page.find(query, projection).exec()

    if (!pages || pages.length === 0) {
      return res.status(404).json({ message: 'Ссылки не найдены' })
    } else {
      res.page = pages
      next()
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = router
