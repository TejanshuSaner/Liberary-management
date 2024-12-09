const express = require('express');
const Book = require('../models/Book');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all books
router.get('/books', authenticateToken, async (req, res) => {
  const books = await Book.find();
  res.status(200).json(books);
});

// Add a book (Admin only)
router.post('/books', authenticateToken, authorizeRoles(['admin']), async (req, res) => {
  const { title, author, publishedYear } = req.body;
  const newBook = new Book({ title, author, publishedYear });
  await newBook.save();
  res.status(201).json(newBook);
});

// Update a book (Admin only)
router.put('/books/:id', authenticateToken, authorizeRoles(['admin']), async (req, res) => {
  const { id } = req.params;
  const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json(updatedBook);
});

// Delete a book (Admin only)
router.delete('/books/:id', authenticateToken, authorizeRoles(['admin']), async (req, res) => {
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  res.status(200).json({ message: 'Book deleted' });
});

module.exports = router;
