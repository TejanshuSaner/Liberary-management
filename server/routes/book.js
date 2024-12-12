const express = require('express');
const Book = require('../models/Book');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();


router.get('/books', authenticateToken, async (req, res) => {
  const books = await Book.find();
  res.status(200).json(books);
});


router.post('/books', authenticateToken, authorizeRoles(['admin']), async (req, res) => {
  const { title, author, publishedYear } = req.body;
  const newBook = new Book({ title, author, publishedYear });
  await newBook.save();
  res.status(201).json(newBook);
});


router.put('/books/:id', authenticateToken, authorizeRoles(['admin']), async (req, res) => {
  const { id } = req.params;
  const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json(updatedBook);
});


router.delete('/books/:id', authenticateToken, authorizeRoles(['admin']), async (req, res) => {
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  res.status(200).json({ message: 'Book deleted' });
});

module.exports = router;
