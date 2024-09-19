const Post = require("../models/post.models");
const User = require("../models/User.models");
const createError = require("http-errors");

// Funciones para manejar publicaciones
async function createPost(data) {
  const newPost = await Post.create(data);
  return newPost;
}

async function getAllPosts(search) {
  let filter = {};

  if (search) {
    filter.title = new RegExp(search, "i"); 
  }

  const posts = await Post.find(filter).populate("user");

  return posts;
}

async function updatePostById(id, data) {
  const post = await Post.findById(id).populate("user");
  if (!post) {
    throw createError(404, "Post not found");
  }
  if (data.user) {
    throw createError(400, "User cannot be updated");
  }
  const updatedPost = await Post.findByIdAndUpdate(id, data, { new: true });
  return updatedPost;
}

async function deletePostById(id) {
  const post = await Post.findById(id).populate("user");
  if (!post) {
    throw createError(404, "Post not found");
  }
  const deletedPost = await Post.findByIdAndDelete(id);
  return deletedPost;
}

// Funciones para manejar usuarios
async function createUser(data) {
  const newUser = await User.create(data);
  return newUser;
}

async function getAllUsers() {
  const users = await User.find({});
  return users;
}

async function updateUserById(id, data) {
  const user = await User.findById(id);
  if (!user) {
    throw createError(404, "User not found");
  }
  const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
  return updatedUser;
}

async function deleteUserById(id) {
  const user = await User.findById(id);
  if (!user) {
    throw createError(404, "User not found");
  }
  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
}

module.exports = { 
  createPost, 
  getAllPosts, 
  updatePostById, 
  deletePostById, 
  createUser, 
  getAllUsers, 
  updateUserById, 
  deleteUserById 
};