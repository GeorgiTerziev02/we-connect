const formidable = require('formidable');
const Post = require('../models/post');
const { uploadFile } = require('../utils/cloudinary');

const createPost = async (req, res) => {
  const form = formidable({ multiples: true });

  // form.on('file', (name, file) => {
  //   console.log(name);
  //   console.log(file.path);
  // });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    // TODO: validation
    uploadFile(files.image.path, async (imageUrl) => {
      const {
        description,
        location
      } = fields;

      const creatorId = req.userId;
      const createdAt = new Date().toUTCString();

      try {
        const post = new Post({ description, imageUrl, createdAt, location, creatorId });
        const postObj = await post.save();
        res.status(201).json(postObj._id);
      } catch (error) {
        console.log(error);
        res
          .status(400)
          .json({
          error: "error"
        });
      }
    });
  });
};

module.exports = {
  createPost
};