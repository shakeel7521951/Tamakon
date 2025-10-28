import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pdfUrl: {
        type: String,
        required: true,
    },
    coverImageUrl: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Book = mongoose.model('Book', BookSchema);
export default Book;