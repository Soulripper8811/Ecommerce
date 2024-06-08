import User from "../model/UserModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("please fill all the details.");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).send("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    generateToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      admin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Inavalid User Data.");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("please fill all the details.");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordValid) {
      generateToken(res, existingUser._id);
      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
      return;
    }
  }
});
const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout successfully" });
});

const getAllUser = asyncHandler(async (req, res, next) => {
  const users = await User.find({});

  if (users) {
    try {
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  }
});
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User Not found");
  }
});
const updateCurrentUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = hashedPassword;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot Delete Admin User");
    }
    await User.deleteOne({ _id: user._id });
    res.json({
      message: "user removed",
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});
const getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const updateUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
};
