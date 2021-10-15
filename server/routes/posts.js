const express = require('express')
const router = express.Router()
const db = require('../db')

function isLoginedUser(logined_id, userId) {
  if (!logined_id || userId !== logined_id) {
    return false
  }
  return true
}

router.get('/', (req, res) => {
  db.query('SELECT id, title FROM post ORDER BY created', (err, result) => {
    res.json(result);
  })
})

router.get('/create', (req, res) => {
  if (req.session.logined_id) {
    res.json({
      result: true
    })
  } else {
    res.json({
      result: false
    })
  }
})

router.get('/:postId', (req, res) => {
  db.query(
    'SELECT post.id, title, description, created, userId, user.nickname FROM post LEFT JOIN user ON post.userId=user.id WHERE post.id=?',
    [req.params.postId],
    (err, result) => {
      if (err) {
        return next(err)
      }
      result = result[0];

      res.json({
        id: result.id,
        title: result.title,
        desc: result.description,
        created: result.created,
        userId: result.userId,
        userNickname: result.nickname
      })
    }
  )
})

router.post('/create', (req, res) => {
  var logined_id = req.session.logined_id;

  if (!logined_id) {
    res.json({
      result: false
    })
  } else {
    db.query(
      'INSERT INTO post (title, description, created, userId) VALUES (?, ?, NOW(), ?)',
      [req.body.title, req.body.desc, logined_id],
      (err, result) => {
        if (err) {
          return next(err)
        }

        db.query('SELECT id, title FROM post', (err, result) => {
          if (err) {
            return next(err)
          }
          res.json({
            result: true,
            posts: result
          })
        })
      }
    )
  }
})

router.post('/update', (req, res) => {
  if (!isLoginedUser(req.session.logined_id, req.body.userId)) {
    return res.json({
      result: false
    })
  }
  res.json({
    result: true
  })
})

router.post('/update/:postId', (req, res) => {
  if (!isLoginedUser(req.session.logined_id, req.body.userId)) {
    return res.json({
      result: false,
      message: '로그인 하지 않았거나 해당 회원이 아님'
    })
  }

  db.query(
    'UPDATE post SET title=?, description=? WHERE id=?',
    [req.body.title, req.body.desc, req.params.postId],
    (err, result) => {
      if (err) {
        return next(err)
      }

      db.query(
        'SELECT post.id, title, description, created, userId, user.nickname FROM post LEFT JOIN user ON post.userId=user.id WHERE post.id=?',
        [req.params.postId],
        (err, post) => {
          if (err) {
            return next(err)
          }
          post = post[0];

          res.json({
            result: true,
            post: {
              id: post.id,
              title: post.title,
              desc: post.description,
              created: post.created,
              userId: post.userId,
              userNickname: post.nickname
            }
          })
        }
      )
    }
  )
})

router.post('/delete', (req, res) => {
  if (!isLoginedUser(req.session.logined_id, req.body.userId)) {
    return res.json({
      result: false,
      message: '로그인 하지 않았거나 해당 회원이 아님'
    })
  }

  db.query('DELETE FROM post WHERE id=?', [req.body.postId], (err, result) => {
    if (err) {
      return next(err)
    }
    db.query('DELETE FROM comment WHERE postId=?', [req.body.postId], (err, result) => {
      if (err) {
        return next(err)
      }
      res.json({
        result: true
      })
    })
  })
})

module.exports = router;
