const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async(filePath) => {
    try {
        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(filePath);
        
        // Saves 'url' and 'publicId' in "/models/Image.js" into DB
        return {
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id,
        }
    } catch (error) {
        console.log(`Error while uploading to Cloudinary ${error}`);
        throw new Error('Error while uploading to Cloudinary');
    }
}

module.exports = {
    uploadToCloudinary,
}