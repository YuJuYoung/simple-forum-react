const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', (req, res) => {
  db.query('SELECT * FROM content', (err, contents) => {
    if (err) {
      return next(err)
    }
    res.json(contents)
  })
})

module.exports = router;
