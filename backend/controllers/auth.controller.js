import User from "../models/user.model.js";
import comparePassword from "../helpers/comparePasswordHelper.js";
import hashPassword from "../helpers/hashPasswordHelper.js";
import generateToken from "../helpers/generateToken.js";

export const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      throw new Error("All fields are required.");
    }

    if (password.length < 5) {
      throw new Error("Password should be at least 6 characters long");
    }

    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return res
        .status(400)
        .json({ success: false, error: "Email is taken already" });
    }

    const hashedPassword = await hashPassword(password);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({
      success: true,
      user: { ...user._doc, password: undefined },
      message: "Registered successfully",
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("All fields are required.");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, error: "No user found" });
    }

    const matchedPassword = await comparePassword(password, user.password);

    if (matchedPassword) {
      generateToken(res, user._id); //generate token and set it to cookie

      return res
        .status(200)
        .json({ success: true, message: "Login successfully" });
    }
    return res
      .status(400)
      .json({ success: false, error: "Password is incorrect" });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const guardDashboard = async (req, res) => {
  console.log(`User ID in Dashboard: ${req.userId}`);
  return res.status(200).json({ success: true });
};

export const guardLogin = async (req, res) => {
  return res.status(200).json({ success: true });
};

export const guardSignup = async (req, res) => {
  return res.status(200).json({ success: true });
};

export const guardHomepage = async (req, res) => {
  return res.status(200).json({ success: true });
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "Logout successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};
