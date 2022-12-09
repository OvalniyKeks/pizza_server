const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const users = await User.find()

    res.json({
      users
    })
  } catch (err) {
    res.status(404).json({
      message: err.message
    });
  }
})

module.exports = router
