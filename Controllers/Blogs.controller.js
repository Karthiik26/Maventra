import Blog from "../DbSchema/Blog.schema.js";

const CreateBlog = async (req, res) => {
    try {
        const { title, subTitle, tag, content } = req.body;

        if (
            !title?.trim() ||
            !subTitle?.trim() ||
            !content?.trim() ||
            !Array.isArray(tag) ||
            tag.length === 0
        ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const authorId = req.user?.id;

        if (!authorId) {
            return res.status(401).json({ message: "Unauthorized: No author ID" });
        }

        const blog = await Blog.create({
            title: title,
            subTitle: subTitle,
            tag: tag,
            content: content,
            author: authorId,
        });

        return res.status(201).json({
            success: true,
            message: "Blog created successfully",
            blog,
        });
    } catch (error) {
        console.error("CreateBlog Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};


const UpdateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, subTitle, tag, content } = req.body;

        const blog = await Blog.findById(id);

        if (!blog) return res.status(404).json({ message: "Blog not found" });

        if (String(blog.author) !== req.user?.id) {
            return res.status(403).json({ message: "Not authorized to update this blog" });
        }

        blog.title = title || blog.title;
        blog.subTitle = subTitle || blog.subTitle;
        blog.tag = tag || blog.tag;
        blog.content = content || blog.content;

        const updatedBlog = await blog.save();

        return res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            blog: updatedBlog
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};


const DeleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        if (String(blog.author) !== req.user?.id) {
            return res.status(403).json({ message: "Not authorized to delete this blog" });
        }

        await blog.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Blog deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};


const getAllBlogPosts = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("author", "name email").sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: blogs.length,
            blogs
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};


const getPostsByTag = async (req, res) => {
    try {
        const { tag } = req.params;

        const blogs = await Blog.find({ tag: { $in: [tag] } }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: blogs.length,
            blogs
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};


const getPost = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findById(id).populate("author", "name email");

        if (!blog) return res.status(404).json({ message: "Blog not found" });

        return res.status(200).json({
            success: true,
            blog
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

export {
    CreateBlog,
    UpdateBlog,
    DeleteBlog,
    getAllBlogPosts,
    getPostsByTag,
    getPost
};
