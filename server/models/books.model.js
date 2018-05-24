const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const booksSchema = new Schema({
  title: String,
  penerbit: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  ulasans: [{
    type: Schema.Types.ObjectId,
    ref: 'Ulasans'
  }],
  like: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Books', booksSchema);
