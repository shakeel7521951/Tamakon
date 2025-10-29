import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    posterImage: {
        type: String,
    },
    content: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    html: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    tags: [String],
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
