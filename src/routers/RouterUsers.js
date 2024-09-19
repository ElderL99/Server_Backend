const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Article = require('../models/Article');
const User = require('../models/User');

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send({ message: 'No token provided' });
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) return res.status(500).send({ message: 'Failed to authenticate token' });
        req.userId = decoded.id;
        next();
    });
};

// Create article
router.post('/', verifyToken, async (req, res) => {
    const { title, content } = req.body;
    const article = new Article({ title, content, author: req.userId });
    await article.save();
    res.send({ message: 'Article created successfully' });
});

// Get all articles
router.get('/', async (req, res) => {
    const articles = await Article.find().populate('author', 'username');
    res.send(articles);
});

// Get article by ID
router.get('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id).populate('author', 'username');
    res.send(article);
});

// Update article
router.put('/:id', verifyToken, async (req, res) => {
    const { title, content } = req.body;
    const article = await Article.findById(req.params.id);
    if (article.author.toString() !== req.userId) {
        return res.status(403).send({ message: 'Not authorized' });
    }
    article.title = title;
    article.content = content;
    await article.save();
    res.send({ message: 'Article updated successfully' });
});

// Delete article
router.delete('/:id', verifyToken, async (req, res) => {
    const article = await Article.findById(req.params.id);
    if (article.author.toString() !== req.userId) {
        return res.status(403).send({ message: 'Not authorized' });
    }
    await article.remove();
    res.send({ message: 'Article deleted successfully' });
});

module.exports = router;