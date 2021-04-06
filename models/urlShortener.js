const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlShortener = new Schema({
  longUrl: {
    type: String
  },
  shortUrl: {
    type: String
  }
})

module.exports = mongoose.model('UrlShortener', urlShortener)