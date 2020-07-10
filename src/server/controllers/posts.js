const formidable = require('formidable');
const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const { uploadFile, isImageValid } = require('../utils/cloudinary');

const createPost = (description, location, creatorId, image, callback) => {
  if (!description || description.length > 2000) {
    return callback({
      error: "Description is required and should be less than 2000 symbols!"
    });
  }

  if (location && location.length > 100) {
    return callback({
      error: "Location should be less than 100 symbols!"
    });
  }

  if (!image) {
    return callback({
      error: "Image is required!"
    });
  }

  if (!isImageValid(image.type)) {
    return callback({
      error: "The given file is not an image!"
    });
  }

  uploadFile(image.path, async (imageUrl) => {
    if (imageUrl === false) {
      return callback({
        error: "Error occured while uploading the image!"
      });
    }

    const createdAt = new Date().toUTCString();

    try {
      const post = new Post({ description, imageUrl, createdAt, location, creatorId });
      const postObj = await post.save();

      const postId = postObj._id;
      await User.findByIdAndUpdate(creatorId, { $push: { posts: postId } });
      return callback({
        postId
      });
    } catch (error) {
      console.error(error);
      return callback({
        error: "Error occured while updating the database! Try again!"
      });
    }
  });
};

const getPostsByUserId = async (userId) => {
  try {
    const posts = await User.findById(userId).select('-password').populate('posts').lean();
    
    if (!posts) {
      return {
        error: "Invalid user id!"
      };
    }

    return posts;
  } catch (err) {
    console.error(err);
    return {
      error: "Invalid user id!"
    };
  }
};

const getPostById = async (postId) => {
  try {
    const post = await Post.findById(postId).lean();
    if (!post) {
      return {
        error: "Invalid post id!"
      }
    }

    return {
      post
    };
  } catch (err) {
    console.error(err);
    return {
      error: "Invalid post id!"
    }
  }
}

const likePost = async (postId, userId) => {
  const post = await Post.findById(postId).lean();
  if (!post) {
    return {
      error: "Invalid postId!"
    }
  }

  try {
    if (JSON.stringify(post.likes).includes(userId.toString())) {
      await Post.findByIdAndUpdate(postId, { $pullAll: {likes: [userId] } });
      return {
        message: "disliked"
      }
    } else {
      await Post.findByIdAndUpdate(postId, { $push: { likes: userId } });
  
      return {
        message: "liked"
      }
    }
  } catch (err) {
    console.error(err);
    return {
      error: "Error occured while updating the database!"
    }
  }
}

const deletePostById = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    return {
      error: "Invalid postId!"
    }
  }

  if (JSON.stringify(post.creatorId) !== JSON.stringify(userId)) {
    return {
      error: "Given userId is not the creator of the post!"
    }
  }

  try {
    // TODO: Is deleted?
    
    return {
      message: "Successfully deleted!"
    }
  } catch (err) {
    console.error(err);
    return {
      error: "Error occured while updating the database!"
    }
  }
};


module.exports = {
  createPost,
  getPostById,
  getPostsByUserId,
  deletePostById,
  likePost
};