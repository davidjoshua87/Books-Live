require('dotenv').config();
const jwt = require('jsonwebtoken');


module.exports = {
  UserloginForPost: function (req, res, next) {
    let token = req.headers.token;
    let id = req.params.id
    if(token) {
      let decode = jwt.verify(token, process.env.RAHASIA);
      if(decode) {
        next();
      } else {
        res.send({
          message: 'Anda tidak dapat melakukan hal ini!'
        })
      }
    } else {
      res.send({
        message: 'Kamu harus Log In terlebih dahulu, atau mendaftar terlebih dahulu!'
      })
    }
  },
  UserloginOnly: function (req, res, next) {
    let token = req.headers.token;
    let id = req.params.id
    if(token) {
      let decode = jwt.verify(token, process.env.RAHASIA);
      if(decode._id === id) {
        next();
      } else {
        res.send({
          message: 'Anda tidak dapat melakukan hal ini!'
        })
      }
    } else {
      res.send({
        message: 'Kamu harus Log In terlebih dahulu, atau mendaftar terlebih dahulu!'
      })
    }
  },
  UserloginForUlasan: function (req, res, next) {
    let token = req.headers.token;
    let id = req.params.answerId
    if(token) {
      let decode = jwt.verify(token, process.env.RAHASIA);
      if(decode) {
        next();
      } else {
        res.send({
          message: 'Anda tidak dapat melakukan hal ini!'
        })
      }
    } else {
      res.send({
        message: 'Kamu harus Log In terlebih dahulu, atau mendaftar terlebih dahulu!'
      })
    }
  }
}
