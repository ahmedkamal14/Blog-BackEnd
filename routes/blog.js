const express = require("express");
const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/blog.js");

const router = express.Router();

router.route("/").get(getAllPosts).post(createPost);
router.route("/:id").get(getPost).patch(updatePost).delete(deletePost);

module.exports = { blogRouter: router };
