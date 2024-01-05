import bcryptjs from "bcryptjs";
import User from "../models/user.modal.js";
import genTokenAndCookie from "../utils/genTokenAndCookie.js";

export const test = (req, res) => {
  res.status(200).json({ message: "Server is active" });
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
    const isValidPassword = await bcryptjs.compare(password, user.password);
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
