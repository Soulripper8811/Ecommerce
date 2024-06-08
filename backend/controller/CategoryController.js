import Category from "../model/categoryModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

const createCategory = asyncHandler(async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.json({
        error: "Name is Required",
      });
    }
    const exsistingCategory = await Category.findOne({ name });
    if (exsistingCategory) {
      return res.json({
        error: "Already Existing",
      });
    }
    const category = await Category({
      name,
    }).save();
    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    const category = await Category.findOne({ _id: categoryId });
    if (!category) {
      return res.status(404).json({
        error: "Cartegory not found",
      });
    }
    category.name = name;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server Error" });
  }
});

const removeCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    const removed = await Category.findByIdAndDelete({ _id: categoryId });
    res.json(removed);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server Error" });
  }
});

const listCategory = asyncHandler(async (req, res) => {
  try {
    const all = await Category.find({});
    res.json(all);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});
const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});
export {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
};
