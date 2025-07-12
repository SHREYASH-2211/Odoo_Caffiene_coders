const express = require('express');
const router = express.Router();
const {getUserById,createUser,loginUser,updateUser} = require('../Controller/userController');

router.get('/getusers/:id', getUserById);
router.post('/createuser', createUser);
router.post('/login', loginUser);
router.put('/userUpdate/:id', updateUser);

module.exports = router;
