const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const sessionStore = new MySQLStore({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '753421',
  database: 'db_2'
})
const helmet = require('helmet')
const bodyParser = require('body-parser')

app.use(helmet())
app.use(cors())
app.use(session({
  key: 'session_id',
  secret: 'keyboard cat',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var contentRouter = require('./routes/contents')
var userRouter = require('./routes/users')
var postRouter = require('./routes/posts')
var commentRouter = require('./routes/comments')

app.use('/contents', contentRouter)
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/comments', commentRouter)

app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!')
})

app.use(function(err, req, res, next) {
  res.status(500).send('Something broke!')
})

app.listen(3001)
