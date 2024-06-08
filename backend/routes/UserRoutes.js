import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById
} from "../controller/UserController.js";
import { authenticate, authorizedAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizedAdmin, getAllUser);
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

router
  .route("/:id")
  .delete(authenticate, authorizedAdmin, deleteUserById)
  .get(authenticate, authorizedAdmin, getUserById)
  .put(authenticate, authorizedAdmin, updateUserById);
export default router;
