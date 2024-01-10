import Post from "../models/post.modal.js";
import User from "../models/user.modal.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req, res) => {
  try {
    const { postedBy, text } = req.body;
    let { img } = req.body;

    if (!postedBy || !text) {
      return res
        .status(400)
        .json({ error: "Postedby and text fields are required" });
    }

    const user = await User.findById(postedBy);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized to create post" });
    }

    const maxLength = 500;
    if (text.length > maxLength) {
      return res
        .status(400)
        .json({ error: `Text must be less than maxLength characters` });
    }

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }

    const newPost = new Post({ postedBy, text, img });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not valid" });

    res.status(200).json({ message: "Post found", post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.postedBy.toString() !== req.user._id.toString())
      return res.status(404).json({ error: "Unauthorized to delete post" });

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const likeUnlike = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ error: "Post not found" });

    const userLiked = post.likes.includes(userId);

    if (userLiked) {
      //unlike
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      res.status(200).json({ message: "post unliked" });
    } else {
      post.likes.push(userId);
      await post.save();
      res.status(200).json({ message: "post liked successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const reply = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;
    const userProfilePic = req.user.profilePic;
    const username = req.user.username;

    if (!text) return res.status(300).json({ error: "Text is required" });

    const post = await Post.findById(postId);

    if (!post) return res.status(303).json({ error: "Post not found" });

    const reply = { userId, text, userProfilePic, username };

    post.replies.push(reply);
    await post.save();

    res.status(200).json({ message: "Reply added successfully", post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not Found" });

    const following = user.following;

    const feedPost = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: -1,
    });

    res.status(200).json({ feedPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
