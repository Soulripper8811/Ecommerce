//packages
import path, { join } from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

//utils
import connectDB from "./config/db.js";
//routes
import UserRoutes from "./routes/UserRoutes.js";
import CategoryRoutes from "./routes/CategoryRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

//logic
const port = process.env.PORT || 5000;
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//use of routes
app.use("/api/users", UserRoutes);
app.use("/api/category", CategoryRoutes);
app.use("/api/product", ProductRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));
app.get("/", (req, res) => {
  res.json("hellow");
});

app.listen(port, () => {
  console.log(`connected to server at ${port}`);
});
