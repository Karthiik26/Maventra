import express from "express";
import Middleware from "../Middlewares/middleware.js";
import { CreateBlog, UpdateBlog, DeleteBlog, getAllBlogPosts, getPostsByTag, getPost } from "../Controllers/Blogs.controller.js";

const blogRouter = express.Router();

blogRouter.post("/create", Middleware, CreateBlog);
blogRouter.put("/update/:id", Middleware, UpdateBlog);
blogRouter.delete("/delete/:id", Middleware, DeleteBlog);
blogRouter.get("/all", getAllBlogPosts);
blogRouter.get("/tag/:tag", getPostsByTag);
blogRouter.get("/:id", getPost);

export default blogRouter;
