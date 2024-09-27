const Post = require("../models/Post.js");
const cloudinary = require("./cloudinaryConfig.js");
const { unlink } = require("fs/promises");
const { StatusCodes } = require("http-status-codes");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id }).sort("-createdAt");
    res.status(StatusCodes.OK).json({ posts, count: posts.length });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({ _id: id, author: req.user._id });
    if (!post) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `Post with id ${id} not found` });
    }
    res.status(StatusCodes.OK).json({ post });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    // Upload the image to Cloudinary
    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "post_images",
      });

      imageUrl = result.secure_url;

      // Remove the uploaded file from local storage
      await unlink(req.file.path);
    }

    // Create the post, including the image URL if present
    const post = await Post.create({
      ...req.body,
      author: req.user._id, // Assuming user ID is available through auth middleware
      image: imageUrl, // Store the image URL
    });

    res.status(StatusCodes.CREATED).json({ post });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOneAndUpdate(
      { _id: id, author: req.user._id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!post) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `Post with id ${id} not found` });
    }
    res.status(StatusCodes.OK).json({ post });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOneAndDelete({ _id: id, author: req.user._id });
    if (!post) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `Post with id ${id} not found` });
    }
    res.status(StatusCodes.OK).json({ post });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
