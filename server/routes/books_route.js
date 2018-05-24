const Book = require('../controllers/books_control');
const veryfication = require('../helpers/token')
const router = require('express').Router();

router.get('/', Book.getAllItems);
router.get('/:id', Book.getOneItem);
router.post('/', veryfication.UserloginForPost, Book.createBook);
router.delete('/:id', veryfication.UserloginForPost, Book.deleteItem);
router.put('/ulasan/:id', Book.addUlasans);
router.put('/like/:id', veryfication.UserloginForPost, Book.addLikes);
router.put('/unlike/:id', veryfication.UserloginForPost, Book.removeLikes);

module.exports = router;
