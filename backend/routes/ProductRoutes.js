import express from "express";
import { authenticate, authorizedAdmin } from "../middleware/authMiddleware.js";
import formidable from "express-formidable";
import checkId from "../middleware/checkId.js";
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
} from "../controller/ProductController.js";

const router = express.Router();

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizedAdmin, formidable(), addProduct);
router.route("/allproducts").get(fetchAllProducts);
router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);
router
  .route("/:id")
  .put(authenticate, authorizedAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizedAdmin, removeProduct)
  .get(fetchProductById);

router
  .route("/:id/review")
  .post(authenticate, authorizedAdmin, addProductReview);
export default router;
