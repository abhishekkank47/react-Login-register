import express from 'express'
import { forgotPassController, loginController, registerController, resetPassController, verifyAuthAccess, verifyEmail } from '../Controllers/authController.js';
import { protectedRouteMiddleware } from '../Middlewares/authMiddleware.js';

export const authRouter = express.Router();

//Register
authRouter.post('/register', registerController );

//Login
authRouter.post('/login', loginController );

//Verify
authRouter.post("/verify-email", verifyEmail)

//Forgot Pass
authRouter.post("/forgot-password", forgotPassController)

//Reset Pass
authRouter.post("/reset-password/:token", resetPassController )


////////////////////////////////////////////////////

//check auth for protetect Pages Access
authRouter.get("/check-auth",protectedRouteMiddleware, verifyAuthAccess )