import jwt from "jsonwebtoken";

const genTokenAndCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SEC, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
  });

  return token;
};

export default genTokenAndCookie;
