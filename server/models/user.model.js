const mongoose   = require('mongoose')
const Schema     = mongoose.Schema
const bycrypt    = require('bcryptjs')
const saltRounds = 10

const userSchema = mongoose.Schema({
  name: {
      type: String,
      required: 'Name required',
      unique: [true, 'Please use other name']
  },
  username: {
      type: String,
      required: 'Username required',
      unique: [true, 'Please use other username']
  },
  email: {
    type: String,
    require: [true, 'Email required'],
    unique: [true, 'Email already exits'],
    validate: {
      validator: function (email) {
        return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email);
      },
      message: 'Email not valid'
    }
  },
  password: {
    type: String,
    require: [true, 'Password required']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema);
