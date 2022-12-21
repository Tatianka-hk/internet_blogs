const express = require('express');
const AuthController = require('../controllers/Blog')
const router = express.Router();
fs = require("fs")
const upload = require('../middleware/upload_image')
const {blog_checker} = require('../middleware/check') // for checking inputed data from user



router.get('/user/:id/blog/:name', AuthController.blog_get)
router.post('/user/:id/blog/:name', AuthController.blog_post)
router.get('/user/:id/blog/:name/create_post',AuthController.get_create_post )
router.post('/user/:id/blog/:name/create_post',blog_checker,AuthController.post_create_post )
router.post('/user/:id/blog/:name/upload/:s_id', upload.single('image'),AuthController.blog_upload_file )
router.post('/user/:id/blog/:name/upload2/:s_id', upload.single('image'),AuthController.blog_upload_file2 )
router.post('/user/:id/blog/:name/upload3/:s_id', upload.single('image'),AuthController.blog_upload_file3 )
router.post('/user/:id/blog/:name/upload4/:s_id', upload.single('image'),AuthController.blog_upload_file4 )
module.exports = router;