const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
  // Описываем модель Page. То есть из чего состоит динамическая страница сайта.

  url: {
    // Например, адрес страницы является строкой. Он обязателен и должен быть уникальным.
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  tags: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdDate: {
    // У каждой страницы автоматически сохраняется дата создания.
    type: Date,
    default: Date.now
  }
})

pageSchema.index({ title: 'text', tags: 'text' })

module.exports = mongoose.model('Page', pageSchema)
