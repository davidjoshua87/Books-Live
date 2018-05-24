require('dotenv').config();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  signup: function (req, res) {
    let name = req.body.name,
      username = req.body.username,
      email = req.body.email,
      password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.findOne({
      username: username
    }, (err, data) => {
      if(err) {
        res.status(400)
          .send({
            message: 'Kesalahan, tidak dapat memunculkan data',
            error: err
          })
      } else {
        if(data) {
          res.send({
            message: 'Username sudah pernah digunakan, harap ulangi kembali',
          })
        } else {
          User.create({
            name: name,
            email: email,
            username: username,
            password: password
          }, (err, result) => {
            if(err) {
              res.status(400)
                .send({
                  message: 'Kesalahan, tidak dapat membuat user baru',
                  error: err
                })
            } else {
              res.send({
                message: 'Selamat, Berhasil terdaftar sebagai user baru',
                data: result
              })
            }
          })
        }
      }
    })
  },

  signin: function (req, res) {
    let username = req.body.username,
      password = req.body.password;
    User.findOne({
      username: username
    }, (err, data) => {
      if(err) {
        res.status(400)
          .send({
            message: 'Kesalahan, tidak dapat memunculkan data',
            error: err
          })
      } else {
        if(!data) {
          res.send({
            message: 'Username yang anda masukkan belum terdaftar'
          })
        } else {
          if(!bcrypt.compareSync(password, data.password)) {
            res.send({
              message: 'password yang anda masukkan salah!'
            })
          } else {
            var token = jwt.sign({
              _id: data._id,
              fullname: data.fullname,
              email: data.email,
              address: data.address
            }, process.env.RAHASIA, {
              expiresIn: '1d'
            });
            res.status(200)
              .send({
                message: 'Berhasil masuk',
                id: data._id,
                token: token,
                fullname: data.fullname,
                email: data.email
              })
          }
        }
      }
    })
  },

  getAllData: function (req, res) {
    User.find({}, (err, result) => {
      if(err) {
        res.status(400)
          .send({
            message: 'terjadi kesalahan database, tidak bisa memuat data user',
            error: err
          })
      } else {
        res.status(200)
          .send({
            msg: 'Berhasil mendapatkan data user',
            data: result
          })
      }
    })
  },

  getOneData: function (req, res) {
    let id = req.params.id
    User.findById(id, (err, result) => {
      if(err) {
        res.status(400)
          .send({
            message: 'terjadi kesalahan database, tidak bisa memuat data user',
            error: err
          })
      } else {
        res.status(200)
          .send({
            msg: 'Berhasil mendapatkan data user',
            data: result
          })
      }
    })
  }
}
