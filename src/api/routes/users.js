const express = require('express');
const userController = require('src/api/controllers/user-controller');

const router = express.Router();

router.post('/', userController.insertUser);
router.get('/', userController.getUsers);

module.exports = router;
