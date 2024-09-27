const express = require("express");
const {
  uploadProfilePic,
  uploadPostImg,
} = require("../controllers/uploads.js");
const multer = require("multer");

const router = express.Router();

// Multer setup for image uploads (to a temp folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route for Uploading profile-pic (with auth and multer for file handling)
router.post(
  "/upload-profile-pic",
  upload.single("profilePic"),
  uploadProfilePic
);

// Route for uploading post-pic (with auth and multer for file handling)
router.post("/upload-post-img", upload.single("postImg"), uploadPostImg);

module.exports = { uploadsRouter: router };
