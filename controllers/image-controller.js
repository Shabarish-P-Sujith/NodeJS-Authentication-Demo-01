const Image = require('../models/Image');
const { uploadToCloudinary } = require('../helpers/cloudinary-helper');
const fs = require('fs');
const path = require('path');

// controller for Uploading images
const uploadImageController = async (req, res) => {
    try {
        // check if the file is missing in req object
        if(!req.file) {
            return res.status(400).json({
                success: false,
                message: "File is required.. Please upload an Image !!",
            });
        }

        // Validate file path
        if(!req.file.path) {
            return res.status(400).json({
                success: false,
                message: "File upload failed. Please try again.",
            });
        }

        // upload to cloudinary
        const {url, publicId} = await uploadToCloudinary(req.file.path);

        // store the image url and public id along with the uploaded user id in database
        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadBy: req.userInfo.userId // taken from auth-middleware
        });
        await newlyUploadedImage.save();

        // Delete the file from Local Storage
        try {
            // Check if file exists
            if (fs.existsSync(req.file.path)) {
                console.log('Attempting to delete file:', req.file.path);
                fs.unlinkSync(req.file.path);
                console.log('File deleted successfully');
            } else {
                console.log('File does not exist:', req.file.path);
            }
        } catch (deleteError) {
            console.error('Error deleting file:', deleteError);
            // Don't fail the request if file deletion fails
        }

        res.status(201).json({
            success: true,
            message: "Image uploaded successfully",
            image: newlyUploadedImage,
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: "Something went wrong during image upload",
            error: error.message
        });
    }
}

const fetchImagesController = async (req, res) => {
    try {
        const images = await Image.find({});
        if (images) {
            res.status(200).json({
                success: true,
                data: images,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something WRONG !!!"
        });
    }
}

module.exports = {
    uploadImageController, fetchImagesController,
}