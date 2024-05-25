const express = require('express');
const { register, login, logout, getAllUsers } = require('../controller/user.controller.js');
const auth=require("../middleware/auth.middleware.js");
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout',auth,logout)
router.get('/users', getAllUsers);

module.exports = router;
