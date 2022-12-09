require('dotenv').config()

// Подключаем бэкенд на Express.
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const app = express()
const port = process.env.PORT

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({}))

app.use(express.static(__dirname + '/uploads/products'))
app.use(express.static(__dirname + '/uploads/categories'))
app.use(express.static(__dirname + '/uploads/sale'))

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to database')).catch(err => console.log(err))

// Route Admin
app.use('/api/auth', require('./routes/admin/authorization'))
app.use('/api/product', require('./routes/admin/product'))
app.use('/api/category', require('./routes/admin/category'))
app.use('/api/sale', require('./routes/admin/sale'))


// Route Client
app.use('/products', require('./routes/client/product'))
app.use('/sale', require('./routes/client/sale'))
app.use('/order', require('./routes/client/order'))

app.listen(port, () => console.log(`server running at http://localhost:${port}`))
