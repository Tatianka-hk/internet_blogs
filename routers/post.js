const express = require('express');
const AuthController = require('../controllers/Post')
const router = express.Router();
const {blog_checker} = require('../middleware/check') // for checking inputed data from user
const { check, validationResult, body } = require('express-validator');

router.get('/user/:id/blog/:blog_name/post/:post_name',AuthController.get_post )
router.post('/user/:id/blog/:blog_name/post/:post_name',AuthController.post_post )//
router.post('/user/:id/blog/:blog_name/post/:post_name/change_post_name',AuthController.change_post_name )
router.get('/user/:id/blog/:blog_name/post/:post_name/change_post_name',AuthController.get_change_post_name )
router.delete('/user/:id/blog/:blog_name/post/:post_name/delete_post',AuthController.delete_post )
module.exports = router;