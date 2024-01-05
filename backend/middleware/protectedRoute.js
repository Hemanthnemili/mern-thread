import User from "../models/user.modal.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) return res.status(403).json({ message: "Unauthorized" });

    const decode = jwt.verify(token, process.env.JWT_SEC);

    const user = await User.findById(decode.userId).select("-password");

    req.user = user;

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
