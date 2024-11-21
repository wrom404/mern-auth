
const verifyLoginUser = (req ,res, next) => {
  const { token } = req.cookies;

  if (token) {
    return res.status(400).json({ success: false, message: "You are already logged in. Please logout first." })
  }
  next();
}

export default verifyLoginUser;