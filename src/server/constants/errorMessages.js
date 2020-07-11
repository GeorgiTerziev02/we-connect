const errorMessages = {
    userNotFound: "User not found!",
    invalidUserId: "Invalid userId!",
    invalidPostId: "Invalid postId!",
    invalidCommentId: "Invalid commentId!",

    descriptionRequired: "Description is required and should be less than 2000 symbols!",
    locationLength: "Location should be less than 100 symbols!",
    imageRequired: "Image is required!",
    fileNotAnImage: "The given file is not an image!",
    commentContentRequired: "Comment content is required!",
    commentLength: "Comment content length should be less or equal to 1000 symbols!",

    cannotFollowYourself: "You can not follow yourself!",
    userIdIsNotCommentCreator: "Given userId is not the creator of the comment!",
    userIdIsNotPostCreator: "Given userId is not the creator of the post!",
    userIdNotCreatorPostAndComment: "Given userId is not the creator of the comment or the creator of the post!",
    databaseUpdateError: "Error occured while updating the database!",
    uploadingError: "Error occured while uploading the image!",
    notAuthenticated: "Not authenticated!",
    wrongCredentials: "Wrong credentials!",
    missingAuth: "Missing authorization header!",
    userExists: "User with this username already exists!"
};

module.exports = errorMessages;