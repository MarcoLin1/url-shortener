const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bpdyParser = require('body-parser')

const random = (req, res, next) => {
  randomString = Math.random().toString(36).substring(2, 7)
  console.log(randomString)
  next()
}

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(bpdyParser.urlencoded({ extended: true }))

app.use(random)

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/short')

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
