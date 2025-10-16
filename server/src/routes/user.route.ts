import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { userController } from "../controllers/user.controller";
import upload from "../config/multer";

const userRouter = Router();

userRouter.get("/me", authMiddleware, userController.getProfile);
userRouter.put("/me", authMiddleware, upload.single("profilePicture"), userController.updateProfile);

export default userRouter;
