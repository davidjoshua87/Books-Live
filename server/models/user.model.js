const mongoose   = require('mongoose')
const Schema     = mongoose.Schema
const bycrypt    = require('bcryptjs')
const saltRounds = 10

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  username: String,
  password: String
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema);
