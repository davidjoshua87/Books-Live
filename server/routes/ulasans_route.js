const Ulasan = require('../controllers/ulasans_control');
const veryfication = require('../helpers/token')
const router = require('express').Router();

router.get('/', Ulasan.getAllItems);
router.get('/:id', Ulasan.getOneItem);
router.post('/', veryfication.UserloginForPost, Ulasan.createUlasan);
router.delete('/:id', veryfication.UserloginForPost, Ulasan.deleteItem);
router.put('/like/:id', veryfication.UserloginForPost, Ulasan.addLikes);
router.put('/unlike/:id', veryfication.UserloginForPost, Ulasan.removeLikes);

module.exports = router;
