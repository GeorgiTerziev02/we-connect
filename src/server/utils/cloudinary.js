const env = process.env.NODE_ENV;
const config = require('../config/config')[env];

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: config.cloudinaryName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret
});

const validImageTypes = [
    "image/x-png",
    "image/gif",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/svg",
];

const isImageValid = (imageType) => {
    if (validImageTypes.includes(imageType)) {
        return true;
    } 

    return false;
};

// TODO: Add file validation check
const uploadFile = (filePath, callback) => {
    cloudinary.uploader.upload(filePath, (err, result) => {
        if (err) {
            console.error(err);
            return false;
        }
        
        // TODO: remove part of the url that is the same for optimization
        callback(result.secure_url);
    }); 
};

module.exports = {
    uploadFile,
    isImageValid
};