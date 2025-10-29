import Book from "../models/Book.js";

export const createBook = async (req, res) => {
    try {
        const { title, description } = req.body;
        const pdfUrl = req.files?.pdf?.[0]?.path || null;
        const coverImageUrl = req.files?.coverPhoto?.[0]?.path || null;
        const newBook = new Book({
            title,
            description,
            pdfUrl,
            coverImageUrl,
        });
        await newBook.save();
        res.status(201).json({
            message: "Book created successfully",
            book: newBook,
        });
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({
            message: "Error creating book",
            error: error.message,
        });
    }
};


export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error });
    }
};

export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Error fetching book", error });
    }
};

export const updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        );
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: "Error updating book", error });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting book", error });
    }
};

