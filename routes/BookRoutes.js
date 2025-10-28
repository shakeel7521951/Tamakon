import express from 'express';
const router = express.Router();
import { getBooks, getBookById, updateBook, deleteBook, createBook } from '../controllers/BookController.js';

// Route to add a new book
router.post('/create-book', createBook);
router.get('/get-all-books', getBooks);
router.get('/books/:id', getBookById);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

export default router;