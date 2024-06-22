const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

router.get('/', users.getAll);
router.get('/:id', users.getSingle);

router.post('/', users.createUser);
router.put('/:id', users.updateUser);
router.delete('/:id', users.deleteUser);

module.exports = router;