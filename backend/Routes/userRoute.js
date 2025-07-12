const express = require('express');
const router = express.Router();
const {getUserById,createUser,loginUser,updateUser,getUserByEmail,searchUsers} = require('../Controller/userController');

router.get('/getusers/:id', getUserById);
router.post('/createuser', createUser);
router.post('/login', loginUser);
router.put('/update/:id', updateUser);
router.get('/email/:email', getUserByEmail);
router.get('/search', searchUsers);

module.exports = router;
