import { Router } from "express";
import { registerUser,loginUser,logoutUser,refreshAccessToken } from "../controllers/user.controller.js";
// import { upload } from "../middleweres/multer.middleware.js";
import { verifyJWT } from "../middleweres/auth.middleweres.js";
const router = Router();


// User Registration Route
router.route("/register").post(registerUser);


router.route("/login").post(loginUser)


router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

export default router;
