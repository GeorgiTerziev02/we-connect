const formidable = require('formidable');
const Post = require('../models/post');
const User = require('../models/user');
const { uploadFile, isImageValid } = require('../utils/cloudinary');

const createPost = async (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    const {
      description,
      location
    } = fields;

    if (!description || description.length > 2000) {
      return res
        .status(400)
        .json({
          error: "Description is required and should be less than 2000 symbols!"
        });
    }

    if (location && location.length > 100) {
      return res
        .status(400)
        .json({
          error: "Location should be less than 100 symbols!"
        });
    }

    if (!isImageValid(files.image.type)) {
      return res
        .status(400)
        .json({
          error: "The given file is not an image!"
        });
    }
    // TODO: validation
    uploadFile(files.image.path, async (imageUrl) => {
      const creatorId = req.userId;
      const createdAt = new Date().toUTCString();

      try {
        const post = new Post({ description, imageUrl, createdAt, location, creatorId });
        const postObj = await post.save();

        const postId = postObj._id;
        await User.findByIdAndUpdate(creatorId, { $push: { posts: postId } });

        res.status(201).json({postId});
      } catch (error) {
        console.log(error);
        res
          .status(400)
          .json({
            error: "Error occured while updating the database! Try again!"
          });
      }
    });
  });
};

const getPostsByUserId = async (userId) => {
  try {
    return await User.findById(userId).select('-password').populate('posts').lean();
  } catch (err) {
    console.error(err);
    return {
      error: "Invalid user id!"
    };
  }
};

const getPostById = async(postId) => {
  try {
    return await Post.findById(postId).lean();
  } catch (err) {
    console.error(err);
    return {
      error: "Invalid post id!"
    }
  }
}

module.exports = {
  createPost,
  getPostById,
  getPostsByUserId,
};