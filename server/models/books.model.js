const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const booksSchema = new Schema({
  title: String,
  description: String,
  penerbit: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  author: String,
  imageUrl: String,
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
