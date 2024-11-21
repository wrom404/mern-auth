import jwt from "jsonwebtoken";

const verifyUser = async (req, res, next) => {
  const token = req.cookies.token;
  console.log(`Token: ${token}`);

  if (!token) {
    return res.status(401).json({ success: false, error: "Unauthorized user" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return res
      .status(400)
      .json({ success: false, error: "Token is not valid" });
  }

  req.userId = decoded.userId;
  next();
};

export default verifyUser;
