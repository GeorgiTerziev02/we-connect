const formidable = require('formidable');
const Post = require('../models/post');
const { uploadFile } = require('../utils/cloudinary');

const createPost = async (req, res) => {
  const form = formidable({ multiples: true });

  form.on('file', (name, file) => {
    console.log(name);
    console.log(file.path);
    uploadFile(file.path);
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    const {
      description,
      location
    } = fields;

    const cretorId = req.userId;
    const createdAt = new Date().toUTCString();
    console.log(createdAt);
    res.json({ fields, files });
  });
};

module.exports = {
  createPost
};