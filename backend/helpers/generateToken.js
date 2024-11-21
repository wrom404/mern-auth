import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mernauthtutorial123456";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60 * 1000, // match with the value of expiresIn attribute in creating token in jwt so that It wil automatically delete from the browser if it hits the expiration time, basically token is valid within 60 sec
    sameSite: "strict",
  });

  return token;
};

export default generateToken;
