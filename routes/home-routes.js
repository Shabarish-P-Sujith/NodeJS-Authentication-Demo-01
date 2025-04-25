const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');

router.get('/welcome', authMiddleware, (req, res) => {
    // retrieving all the tags/details in userInfo from authMiddleware
    const {userId, username, role} = req.userInfo; 

    res.json({
        message: "Welcome to the Home Page",
        user: {
            _id: userId,
            username,
            role,
        }
    });
});

module.exports = router;