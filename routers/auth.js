const express = require('express');
const AuthController = require('../controllers/Auth')
const router = express.Router();
const {register_check,register_check2,login_checker} = require('../middleware/check') // for checking inputed data from user
const { check, validationResult, body } = require('express-validator');

router.get('/register', AuthController.register_get);
router.post('/register',register_check, AuthController.register_post);
router.post('/login',login_checker, AuthController.login_post);
router.get('/login', AuthController.login_get);

module.exports = router;