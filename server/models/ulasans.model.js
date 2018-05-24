const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ulasanSchema = new Schema({
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  like: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Ulasan', ulasanSchema);
