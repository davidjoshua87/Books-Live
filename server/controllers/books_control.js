const Book = require('../models/Books');

module.exports = {
  getAllItems = function(req, res){
      Book.find({})
      .populate('ulasans')
      .exec((err, result)=>{
          if(err){
              res.status(400)
              .send({
                  message: 'terjadi kesalahan database, tidak bisa memuat data Books',
                  error: err
              })
          } else {
              res.status(200)
              .send(result)
          }
      })
  },

  getOneItem = function(req, res){
      let id = req.params.id
      Book.findById(id)
      .populate('ulasans')
      .exec((err, result)=>{
          if(err){
              res.status(400)
              .send({
                  message: 'terjadi kesalahan database, tidak bisa menemukkan data Books',
                  error: err
              })
          } else {
              res.status(200)
              .send(result)
          }
      })
  },

  createBook = function(req, res){
      let title = req.body.title,
          Book = req.body.Book,
          author = req.body.author,
          ulasans = [],
          like = [],
          unlike = [];
      Book.create({
          title: title,
          Book: Book,
          author: author,
          ulasans: ulasans,
          like: like,
          unlike: unlike
      }, (err, result)=>{
          if(err){
              res.status(400)
              .send({
                  message: 'terjadi kesalahan database, tidak bisa memasukan data Books',
                  error: err
              })
          } else {
              res.status(200)
              .send(result)
          }
      })
  },

  deleteItem = function(req, res){
      let id = req.params.id;
      Book.findByIdAndRemove(id, (err, result)=>{
          if(err){
              res.status(400)
              .send({
                  message: 'Kesalahan, tidak bisa menghapus Book',
                  error: err
              })
          } else {
              res.send(result)
          }
      })
  },

  addUlasans = function(req, res){
      let id = req.params.id,
          ulasan = req.body.ulasanId;
      Book.findByIdAndUpdate(id, {
          $push: { ulasans: ulasan }
      }, {
          safe: true,
          upsert: true,
          new: true
      }, (err, result)=>{
          if(err){
              res.status(400)
              .send({
                  message: 'Kesalahan, tidak bisa menambah ulasan',
                  error: err
              })
          } else {
              res.send(result)
          }
      })
  },

  addLikes = function(req, res){
      let id = req.params.id,
          like = req.body.like;
      Book.findByIdAndUpdate(id, {
          $push: { like: like }
      }, {
          safe: true,
          upsert: true,
          new: true
      }, (err, result)=>{
          if(err){
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

  removeLikes = function(req, res){
      let id = req.params.id,
          like = req.body.like;
      Book.findByIdAndUpdate(id, {
          $pull: { like: like }
      }, {
          safe: true,
          upsert: true
      }, (err, result)=>{
          if(err){
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
