const User = require('../controllers/user_control');
const router = require('express').Router();

router.get('/', User.getAllData);
router.get('/:id', User.getOneData);
router.post('/signup', User.signup);
router.post('/signin', User.signin);

module.exports = router;
