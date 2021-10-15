const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', (req, res) => {
  db.query('SELECT id, nickname FROM user', (err, users) => {
    if (err) {
      return next(err)
    }
    res.json(users)
  })
})

router.get('/logined', (req, res) => {
  if (req.session.logined_id) {
    db.query(
      'SELECT nickname FROM user WHERE id=?',
      [req.session.logined_id],
      (err, result) => {
        if (err) {
          return next(err)
        }
        res.json({
          logined_id: req.session.logined_id,
          logined_nickname: result[0].nickname
        })
      }
    )
  } else {
    res.json({
      logined_id: null,
      logined_nickname: null
    })
  }
})

router.post('/login', (req, res) => {
  if (req.session.logined_id) {
    return res.json({
      result: false,
      logined: true,
      message: '이미 로그인 되어있음'
    })
  }

  db.query(
    'SELECT * FROM user WHERE email=?',
    [req.body.email],
    (err, user) => {
      if (err) {
        return next(err);
      }

      if (user[0]) {
        if (user[0].password === req.body.pwd) {
          req.session.logined_id = user[0].id;
          return res.json({
            result: true,
            logined: true,
            nickname: user[0].nickname,
            id: user[0].id
          })
        } else {
          res.json({
            result: false,
            logined: false,
            message: '비밀번호 오류'
          })
        }
      } else {
        res.json({
          result: false,
          logined: false,
          message: '아이디 오류'
        })
      }
    }
  )
})

router.get('/logout', (req, res) => {
  req.session.logined_id = null;
  res.json({
    message: '로그아웃 성공'
  })
})

router.post('/create', (req, res) => {
  db.query(
    `INSERT INTO user (email, password, nickname) VALUES (?, ?, ?)`,
    [req.body.email, req.body.pwd, req.body.nickname],
    (err, result) => {
      if (err) {
        return next(err)
      }

      db.query(
        'SELECT id FROM user WHERE email=?',
        [req.body.email],
        (err, result) => {
          if (err) {
            return next(err)
          }
          res.json({
            message: '성공',
            user: {
              id: result[0].id,
              nickname: req.body.nickname
            }
          })
        }
      )
    }
  )
})

router.post('/update', (req, res) => {
  if (!req.session.logined_id || req.body.id !== req.session.logined_id) {
    return res.json({
      result: false,
      message: '로그인 되어있지 않거나 해당 회원이 아님'
    })
  }

  db.query(
    'SELECT * FROM user WHERE id=?',
    [req.body.id],
    (err, user) => {
      if (err) {
        return next(err)
      }
      if (user[0].password !== req.body.pwd) {
        return res.json({
          result: false,
          message: '비밀번호 오류'
        })
      }

      db.query(
        'UPDATE user SET nickname=? WHERE id=?',
        [req.body.nickname, req.body.id],
        (err, result) => {
          if (err) {
            return next(err)
          }
          res.json({
            result: true,
            message: '성공'
          })
        }
      )
    }
  )
})

router.post('/delete', (req, res) => {
  if (!req.session.logined_id || req.body.id !== req.session.logined_id) {
    return res.json({
      result: false,
      message: '로그인 되어있지 않거나 해당 회원이 아님'
    })
  }

  db.query(
    'DELETE FROM user WHERE id=?',
    [req.body.id],
    (err, result) => {
      if (err) {
        return next(err)
      }
      req.session.logined_id = null;

      db.query('DELETE FROM post WHERE userId=?', [req.body.id], (err, result) => {
        if (err) {
          return next(err)
        }
        db.query('DELETE FROM comment WHERE userId=?', [req.body.id], (err, result) => {
          if (err) {
            return next(err)
          }
          res.json({
            result: true,
            message: '성공'
          })
        })
      })
    }
  )
})

module.exports = router;
