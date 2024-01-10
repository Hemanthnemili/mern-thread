import jwt from "jsonwebtoken";

const genTokenAndCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SEC, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: true,
  });

  return token;
};

export default genTokenAndCookie;
