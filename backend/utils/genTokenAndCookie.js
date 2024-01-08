import jwt from "jsonwebtoken";

const genTokenAndCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SEC, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 9000,
    httpOnly: true,
  });

  return token;
};

export default genTokenAndCookie;
