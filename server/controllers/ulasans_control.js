const Ulasan = require('../models/ulasans.model');

module.exports = {
  getAllItems: function (req, res) {
    Ulasan.find({})
      .populate('author')
      .exec((err, result) => {
        if(err) {
          res.status(400)
            .send({
              message: 'terjadi kesalahan database, tidak bisa memuat data Ulasans',
              error: err
            })
        } else {
          res.status(200)
            .send(result)
        }
      })
  },

  getOneItem: function (req, res) {
    let id = req.params.id
    Ulasan.findById(id)
      .populate('author')
      .exec((err, result) => {
        if(err) {
          res.status(400)
            .send({
              message: 'terjadi kesalahan database, tidak bisa menemukkan data Ulasans',
              error: err
            })
        } else {
          res.status(200)
            .send(result)
        }
      })
  },

  createUlasan: function (req, res) {
    let content = req.body.content,
      author = req.body.author,
      like = [];
    Ulasan.create({
      content: content,
      author: author,
      like: like
    }, (err, result) => {
      if(err) {
        res.status(400)
          .send({
            message: 'terjadi kesalahan database, tidak bisa memasukan data Ulasans',
            error: err
          })
      } else {
        res.status(200)
          .send(result)
      }
    })
  },

  deleteItem: function (req, res) {
    let id = req.params.id;
    Ulasan.findByIdAndRemove(id, (err, result) => {
      if(err) {
        res.status(400)
          .send({
            message: 'Kesalahan, tidak bisa menghapus Ulasan',
            error: err
          })
      } else {
        res.send(result)
      }
    })
  },

  addLikes: function (req, res) {
    let id = req.params.id,
      like = req.body.like;
    Ulasan.findByIdAndUpdate(id, {
      $push: {
        like: like
      }
    }, {
      safe: true,
      upsert: true,
      new: true
    }, (err, result) => {
      if(err) {
        res.status(400)
          .send({
            message: 'Kesalahan, tidak bisa menambah like',
            error: err
          })
      } else {
        res.send(result)
      }
    })
  },

  removeLikes: function (req, res) {
    let id = req.params.id,
      like = req.body.like;
    Ulasan.findByIdAndUpdate(id, {
      $pull: {
        like: like
      }
    }, {
      safe: true,
      upsert: true
    }, (err, result) => {
      if(err) {
        res.status(400)
          .send({
            message: 'Kesalahan, tidak bisa menambah like',
            error: err
          })
      } else {
        res.send(result)
      }
    })
  }
}
