const express = require('express');
const AuthController = require('../controllers/User')
const router = express.Router();
const {blog_checker} = require('../middleware/check') // for checking inputed data from user

router.get('/user/:id',AuthController.user_get );
router.post('/user/:id/name', AuthController.change_name);
router.post('/user/:id/email', AuthController.change_email);
router.delete('/user/:id', AuthController.delete_user);
router.get('/user/:id/create_blog', AuthController.get_create_blog);
router.post('/user/:id/create_blog', AuthController.post_create_blog);
router.post('/user/:id/change_project_name/:name',  AuthController.put_project_name);
router.delete('/user/:id/delete_porject/:name', AuthController.delete_porject);
router.post('/user/:id/publish_project/:name', AuthController.post_publish);
router.get('/fabula/:id', AuthController.get_view);
module.exports = router;









