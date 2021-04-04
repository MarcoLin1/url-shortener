const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

const random = (req, res, next) => {
  randomString = Math.random().toString(36).substring(2, 7)
  randomUrl = `http://www.urlShortener/${randomString}`
  next()
}

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(random)

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  res.render('index', { randomUrl: randomUrl, urlShortener: req.body.longUrl })
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
