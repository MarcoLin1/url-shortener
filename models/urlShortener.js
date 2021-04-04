const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlShortener = new Schema({
  url: {
    type: String
  }
})

module.exports = mongoose.module('UrlShortener', urlShortener)