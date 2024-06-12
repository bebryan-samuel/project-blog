const express =  require('express');
const imageController = require('../controllers/image.controller.js');
const imageUploader = require('../helpers/image-uploader.js');
const checkAuth = require('../middleware/check-auth.js');

const router = express.Router();

router.post('/upload', checkAuth.checkAuth, imageUploader.upload.single('image'),imageController.upload);

module.exports = router;