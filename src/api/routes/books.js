const express = require('express');
const bookController = require('src/api/controllers/book-controller');

const router = express.Router();

router.post('/', bookController.insertBook);
router.get('/:id', bookController.getBook);

module.exports = router;
