import express from 'express';
const router = express.Router();
import {
    createBlog,
    deleteBlog,
    getBlogById,
    getBlogs,
} from '../controllers/BlogController.js';
import upload from '../middlewares/multerConfig.js';

router.post(
    "/create-blog",
    upload.fields([
        { name: "posterImage", maxCount: 1 },
        { name: "images", maxCount: 10 } 
    ]),
    createBlog
);
router.get('/get-all-blogs', getBlogs);
router.delete('/delete-blog/:id', deleteBlog);
router.get('/get-blog/:id', getBlogById);

export default router;