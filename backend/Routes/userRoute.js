const express = require('express');
const router = express.Router();
const {getUserById,createUser,loginUser} = require('../Controller/userController');

router.get('/getusers/:id', getUserById);
router.post('/createuser', createUser);
router.post('/login', loginUser);

module.exports = router;
