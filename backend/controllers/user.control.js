import bcryptjs from "bcryptjs";
import User from "../models/user.modal.js";
import genTokenAndCookie from "../utils/genTokenAndCookie.js";

export const test = (req, res) => {
  res.status(200).json({ message: "Server is active" });
};

export const profile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username })
      .select("-password")
      .select("-updatedAt");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    if (newUser) {
      genTokenAndCookie(newUser._id, res);
      res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
      });
    } else {
      res.status(404).json({ message: "Invalid user data" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isValidPassword = await bcryptjs.compare(password, user?.password);
    if (!user || !isValidPassword)
      return res.status(403).json({ message: "Invalid username or Password" });

    genTokenAndCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const follow = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString())
      return res
        .status(400)
        .json({ message: "You cannot follow or un follow yourself" });

    if (!userToModify || !currentUser)
      return res.status(401).json({ message: "User not found" });

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      // unfollow user
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      res.status(200).json({ message: "Unfollowed user" });
    } else {
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      res.status(200).json({ message: "followed user" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  const { name, email, username, password, profilePic, bio } = req.body;
  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.params.id !== userId.toString())
      return res
        .status(404)
        .json({ message: "you can only updae your own profile" });

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      user.password = hashedPassword;
    }

    (user.name = name || user.name),
      (user.email = email || user.email),
      (user.username = username || user.username),
      (user.profilePic = profilePic || user.profile),
      (user.bio = bio || user.bio);

    user = await user.save();
    res.status(200).json({ message: "User Updated", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
