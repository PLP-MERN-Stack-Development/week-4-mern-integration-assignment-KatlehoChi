const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Routes for categories
router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);

module.exports = router;

