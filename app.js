const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const UrlShortener = require('./models/urlShortener')
const db = mongoose.connection

mongoose.connect('mongodb://localhost/url-shortener', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/shortUrl', async (req, res) => {
  // 隨機產生亂數
  let randomString = Math.random().toString(36).substring(2, 7)

  // 從資料庫中找是否有一樣的randomString
  let shortUrl = await UrlShortener.findOne({ shortUrl: randomString })

  // 如果沒有找到會是null，代表randomString沒有重複的，相反狀況就顯示重複的訊息
  if (shortUrl === null) {
    await UrlShortener.create({ longUrl: req.body.longUrl, shortUrl: randomString })
    res.render('index', { shortUrl: randomString, longUrl: req.body.longUrl, urlShortener: `http://www.localhost:3000/${randomString}` })
  } else {
    res.render('index', { failed: '重複了!!!' })
  }
})

app.get('/:randomUrl', async (req, res) => {
  // 找到資料庫中shortUrl符合randomUrl的資料，就將網頁導向該筆資料儲存的longUrl
  let url = await UrlShortener.findOne({ shortUrl: req.params.randomUrl })
  return res.redirect(url.longUrl)
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
