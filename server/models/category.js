// category.js - Mongoose model for post categories

const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a category name'],
      trim: true,
      unique: true,
      maxlength: [50, 'Category name cannot exceed 50 characters'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', CategorySchema);