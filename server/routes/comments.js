const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/:postId', (req,res) => {
  db.query(
    'SELECT comment.id, userId, postId, user.nickname, content, updated FROM comment LEFT JOIN user ON userId=user.id WHERE postId=?',
    [req.params.postId],
    (err, result) => {
    if (err) {
      return next(err)
    }
    res.json(result)
  })
})

router.post('/create', (req, res) => {
  var logined_id = req.session.logined_id;

  if (!logined_id) {
    return res.json({
      result: false
    })
  }
  var body = req.body;

  db.query(
    'INSERT INTO comment (postId, userId, content, updated) VALUES (?, ?, ?, NOW())',
    [body.postId, logined_id, body.content],
    (err, result) => {
      if (err) {
        return next(err)
      }
      res.json({
        result: true
      })
    }
  )
})

router.post('/update', (req, res) => {
  var logined_id = req.session.logined_id;

  if (!logined_id || logined_id !== req.body.userId) {
    return res.json({
      result: false,
      message: '로그인이 필요하거나 해당 회원이 아님'
    })
  }
  db.query('UPDATE comment SET content=? WHERE id=?', [req.body.content, req.body.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.json({
      result: true
    })
  })
})

router.post('/delete', (req, res) => {
  var logined_id = req.session.logined_id;

  if (!logined_id || logined_id !== req.body.userId) {
    return res.json({
      result: false,
      message: '로그인이 필요하거나 해당 회원이 아님'
    })
  }
  db.query('DELETE FROM comment WHERE id=?', [req.body.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.json({
      result: true
    })
  })
})

module.exports = router;
