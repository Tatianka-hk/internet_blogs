const express = require('express');
const AuthController = require('../controllers/User')
const router = express.Router();
const {blog_checker} = require('../middleware/check') // for checking inputed data from user
const { check, validationResult, body } = require('express-validator');

router.get('/user/:id',AuthController.user_get )
router.put('/user/:id/name', AuthController.change_name)
router.put('/user/:id/email', AuthController.change_email)
router.delete('/user/:id', AuthController.delete_user)
router.get('/user/:id/create_blog', AuthController.get_create_blog)
router.post('/user/:id/create_blog', blog_checker, AuthController.post_create_blog)
module.exports = router;









