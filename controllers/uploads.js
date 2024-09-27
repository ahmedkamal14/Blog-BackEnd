const cloudinary = require("./cloudinaryConfig.js");
const User = require("../models/User.js");
const Post = require("../models/Post.js");
const { unlink } = require("fs/promises");

const uploadProfilePic = async (req, res) => {
  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile_pictures",
    });

    // Update the user profile with the image URL
    const user = await User.findByIdAndUpdate(
      req.user._id, // Assuming you have user ID from auth middleware
      { profilePic: result.secure_url },
      { new: true } // Return the updated user
    );

    // Remove the uploaded file from local storage
    await unlink(req.file.path);

    res.status(200).json({
      success: true,
      message: "Profile picture uploaded successfully",
      profilePicUrl: user.profilePic,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Profile upload failed" });
  }
};

const uploadPostImg = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "post_images",
    });

    res.status(200).json({
      success: true,
      message: "Post image uploaded successfully",
      imageUrl: result.secure_url,
    });

    // Remove the uploaded file from local storage
    await unlink(req.file.path);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Post image upload failed" });
  }
};

module.exports = { uploadProfilePic, uploadPostImg };
