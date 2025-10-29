import Blog from "../models/Blogs.js";

export const createBlog = async (req, res) => {
    try {
        const { title, description, content, html, author, tags } = req.body;

        const posterImage = req.files?.posterImage?.[0]?.path || null;
        const images = req.files?.images?.map(file => file.path) || [];
        const newBlog = new Blog({
            title,
            description,
            content,
            html,
            author,
            tags,
            posterImage,
            images,
        });

        await newBlog.save();

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            blog: newBlog,
        });
    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({ message: "Error creating blog", error });
    }
};


export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs", error });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting blog", error });
    }
};