// postController.js - Controller logic for blog posts

const Post = require('../models/post');

// @desc    Get all posts
// @route   GET /api/posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('author category');
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

// @desc    Get a single post by ID
// @route   GET /api/posts/:id
exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author category');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

// @desc    Create a new post
// @route   POST /api/posts
exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
};

