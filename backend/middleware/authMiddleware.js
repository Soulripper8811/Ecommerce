import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorrized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorrized, token failed");
  }
});

//check for admin

const authorizedAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin.");
  }
};
export { authorizedAdmin, authenticate };
