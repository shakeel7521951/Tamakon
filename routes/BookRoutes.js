import express from 'express';
const router = express.Router();
import { getBooks, getBookById, updateBook, deleteBook, createBook } from '../controllers/BookController.js';
import upload from '../middlewares/multerConfig.js';

// Route to add a new book
router.post("/create-book", upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "coverPhoto", maxCount: 1 },
]), createBook);
router.get('/get-all-books', getBooks);
router.get('/books/:id', getBookById);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

export default router;