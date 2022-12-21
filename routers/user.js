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
router.put('/user/:id/change_project_name/:name', blog_checker, AuthController.put_project_name)
router.delete('/user/:id/delete_porject/:name', blog_checker, AuthController.delete_porject)
router.post('/user/:id/publish_project/:name', AuthController.post_publish)
router.get('/fabula/:id', AuthController.get_view)
module.exports = router;









