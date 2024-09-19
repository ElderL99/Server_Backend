const createError = require("http-errors");

const Post = require("../models/posts.model");
const User = require("../models/users.model");

async function create(data) {
  if (!data.image) {
    throw createError(400, "Enter the url image");
  }

  if (!data.body) {
    throw createError(400, "Add the publication");
  }

  const newPost = await Post.create(data);

  return newPost;
}

async function getAll(data) {
  let post;
  if (data) {
    post = await Post.find({
      title: { $regex: data, $options: "i" },
    }).populate("user");
  } else {
    post = await Post.find({}).populate("user");
  }

  return post;
}

async function deleteById(id, userId) {
  const existingPost = await Post.findById(id);
  const user = await User.findById(userId.user);

  if (!existingPost) {
    throw createError(404, "Post not found");
  }

  if (user._id.toString() !== existingPost.user.toString()) {
    throw createError(403, "You can't delete this post");
  }

  const postDeleted = await Post.findByIdAndDelete(id);
  return postDeleted;
}

async function updateById(id, newData) {
  const existingPostpost = await Post.findById(id);
  if (!existingPostpost) {
    throw createError(404, "Post not found");
  }

  if (newData) {
    const dataKeys = Object.keys(newData);
    if (dataKeys.includes("user")) {
      throw createError(400, "The user information cannot change");
    }
  }

  const postUpdated = await Post.findByIdAndUpdate(id, newData, {
    new: true,
  });

  return postUpdated;
}

async function getById(id) {
  const post = await await Post.findById(id).populate("user");
  if (!post) {
    throw createError(404, "Post not found");
  }
  return post;
}

module.exports = { create, getAll, deleteById, updateById, getById };
