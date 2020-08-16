const formidable = require('formidable');
const Post = require('../models/post');
const User = require('../models/user');
const { uploadFile, isImageValid } = require('../utils/cloudinary');
const errorMessages = require('../constants/errorMessages');
const responseMessages = require('../constants/responseMessages');

const createPost = (description, location, creator, image, callback) => {
  if (!description || description.length > 2000) {
    return callback({
      error: errorMessages.descriptionRequired
    });
  }

  if (location && location.length > 100) {
    return callback({
      error: errorMessages.locationLength
    });
  }

  if (!image) {
    return callback({
      error: errorMessages.imageRequired
    });
  }

  if (!isImageValid(image.type)) {
    return callback({
      error: errorMessages.fileNotAnImage
    });
  }

  uploadFile(image.path, async (imageUrl) => {
    if (imageUrl === false) {
      return callback({
        error: errorMessages.uploadingError
      });
    }

    const createdAt = new Date().toUTCString();

    try {
      const post = new Post({ description, imageUrl, createdAt, isDeleted: false, location, creator });
      const postObj = await post.save();

      const postId = postObj._id;
      await User.findByIdAndUpdate(creator, { $push: { posts: postId } });
      return callback({
        postId
      });
    } catch (error) {
      console.error(error);
      return callback({
        error: errorMessages.databaseUpdateError
      });
    }
  });
};

const getRecent = async (userId) => {
  try {
    const data = await User.findById(userId).select('-password -posts -followers').populate({
      path: 'following',
      select: '-password -followers -following',
      populate: {
        path: 'posts',
        match: {
          isDeleted: false
        },
        options: { limit: 1, sort: { '_id': -1 } }
      }
    }).lean();

    const posts = data.following.map(u => {
      return u.posts[0];
    })

    return posts;
  } catch (err) {
    console.error(err);
    return {
      error: errorMessages.invalidUserId
    };
  }
}

const getPostsByUserId = async (userId) => {
  try {
    const posts = await User.findById(userId).select('-password').populate({
      path: 'posts',
      match: {
        isDeleted: false
      }
    }).lean();

    if (!posts) {
      return {
        error: errorMessages.invalidUserId
      };
    }

    return posts;
  } catch (err) {
    console.error(err);
    return {
      error: errorMessages.invalidUserId
    };
  }
};

const getPostById = async (postId) => {
  try {
    const post = await Post
      .findOne({ _id: postId, isDeleted: false })
      .populate({
        path: 'comments',
        populate: { path: 'creator' }
      }).lean();

    if (!post) {
      return {
        error: errorMessages.invalidPostId
      }
    }

    return {
      post
    };
  } catch (err) {
    console.error(err);
    return {
      error: errorMessages.invalidPostId
    }
  }
}

const likePost = async (postId, userId) => {
  const post = await Post.findById(postId).lean();
  if (!post || post.isDeleted) {
    return {
      error: errorMessages.invalidPostId
    }
  }

  try {
    if (JSON.stringify(post.likes).includes(userId.toString())) {
      await Post.findByIdAndUpdate(postId, { $pullAll: { likes: [userId] } });
      return {
        message: responseMessages.disliked
      }
    } else {
      await Post.findByIdAndUpdate(postId, { $push: { likes: userId } });

      return {
        message: responseMessages.liked
      }
    }
  } catch (err) {
    console.error(err);
    return {
      error: errorMessages.databaseUpdateError
    }
  }
}

const editPostById = async (postId, userId, description, location) => {
  const post = await Post.findById(postId);

  if (!post || post.isDeleted) {
    return {
      error: errorMessages.invalidPostId
    }
  }

  if (JSON.stringify(post.creator) !== JSON.stringify(userId)) {
    return {
      error: errorMessages.userIdIsNotPostCreator
    }
  }

  if (!description || description.length > 2000) {
    return callback({
      error: errorMessages.descriptionRequired
    });
  }

  if (location && location.length > 100) {
    return callback({
      error: errorMessages.locationLength
    });
  }

  try {
    await Post.findByIdAndUpdate(postId, { description, location });

    return {
      message: responseMessages.successfulUpdate
    }
  } catch (err) {
    console.error(err);
    return {
      error: errorMessages.databaseUpdateError
    }
  }
}

const deletePostById = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post || post.isDeleted) {
    return {
      error: errorMessages.invalidPostId
    }
  }

  if (JSON.stringify(post.creator) !== JSON.stringify(userId)) {
    return {
      error: errorMessages.userIdIsNotPostCreator
    }
  }

  try {
    await Post.findByIdAndUpdate(postId, { isDeleted: true });

    return {
      message: responseMessages.successfulDelete
    }
  } catch (err) {
    console.error(err);
    return {
      error: errorMessages.databaseUpdateError
    }
  }
};


module.exports = {
  createPost,
  getRecent,
  getPostById,
  getPostsByUserId,
  editPostById,
  deletePostById,
  likePost
};