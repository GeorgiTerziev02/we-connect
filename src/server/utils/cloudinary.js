const env = process.env.NODE_ENV;
console.log(env);
const config = require('../config/config')[env];

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: config.cloudinaryName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret
});

// TODO: Add file validation check
const uploadFile = (filePath) => {
    cloudinary.uploader.upload(filePath, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(result);

        return result.url;
    }); 
};

module.exports = {
    uploadFile
};