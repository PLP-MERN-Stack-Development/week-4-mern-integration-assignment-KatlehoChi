// categoryController.js - Controller logic for categories

const Category = require('../models/category');

// @desc    Get all categories
// @route   GET /api/categories
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

// @desc    Create a new category
// @route   POST /api/categories
exports.createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};