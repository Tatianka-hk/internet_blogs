const express = require('express');
const AuthController = require('../controllers/Blog')
const router = express.Router();


router.get('/user/:id/blog/:name', AuthController.blog_get)
router.post('/user/:id/blog/:name', AuthController.blog_post)
module.exports = router;