const multer = require('multer');
const path = require('path');

// Get absolute path to uploads directory
const uploadsDir = path.join(__dirname, '..', 'uploads');

// set our multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const uploadS = Date.now() + '-' + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uploadS);
    }
});

// file filter function
const checkFileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    } else {
        cb(new Error("Not an Image !! Please upload only Images !!"), false);
    }  
}

// Create multer instance
const upload = multer({
    storage: storage,
    fileFilter: checkFileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
});

// Error handling middleware
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: "File size too large. Maximum size is 5MB"
            });
        }
        return res.status(400).json({
            success: false,
            message: err.message
        });
    } else if (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
    next();
};

module.exports = {
    upload,
    handleMulterError
};