const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const adminMiddleware = require('../middlewares/admin-middleware');
const { upload, handleMulterError } = require('../middlewares/upload-middleware');
const { uploadImageController, fetchImagesController } = require('../controllers/image-controller');

// upload the images
router.post('/upload', 
    authMiddleware, 
    adminMiddleware, 
    upload.single('image'),
    handleMulterError,
    uploadImageController
);

// get all the images
router.get('/get', authMiddleware, fetchImagesController)
module.exports = router;