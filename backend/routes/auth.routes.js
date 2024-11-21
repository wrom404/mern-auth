import express from "express";
import {
  signupUser,
  loginUser,
  guardDashboard,
  logoutUser,
  guardLogin,
  guardSignup,
  guardHomepage
} from "../controllers/auth.controller.js";
import verifyLoginUser from "../middlewares/verifyLoginUser.js";
import verifyUser from "../middlewares/verifyUser.js";

const router = express.Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/guard-dashboard", verifyUser, guardDashboard);

router.get("/guard-login", verifyLoginUser, guardLogin);

router.get("/guard-signup", verifyLoginUser, guardSignup);

router.get("/guard-homepage", verifyLoginUser, guardHomepage);


export default router;
