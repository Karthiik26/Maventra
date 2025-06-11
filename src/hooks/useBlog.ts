import { useState } from "react";
import api from "../Utils/api";
import type { Post } from "../Utils/types";


export const useBlog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = async (post: Post) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/blogs/create", post);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Post creation failed");
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (id: string, post: Post) => {
    try {
      const res = await api.put(`/blogs/update/${id}`, post);
      return res.data;
    } catch (err: any) {
      setError("Update failed");
    }
  };

  const deletePost = async (id: string) => {
    try {
      const res = await api.delete(`/blogs/delete/${id}`);
      return res.data
    } catch (err: any) {
      setError("Delete failed");
    }
  };

  const getAllPosts = async () => {
    try {
      const res = await api.get("/blogs/all");
      return res.data;
    } catch (err: any) {
      setError("Fetch failed");
    }
  };

  const getPostById = async (id: string) => {
    try {
      const res = await api.get(`/blogs/${id}`);
      return res.data;
    } catch (err: any) {
      setError("Get post failed");
    }
  };

  const getPostsByTag = async (tag: string) => {
    try {
      const res = await api.get(`/blogs/tag/${tag}`);
      return res.data;
    } catch (err: any) {
      setError("Get by tag failed");
    }
  };

  return {
    createPost,
    updatePost,
    deletePost,
    getAllPosts,
    getPostById,
    getPostsByTag,
    loading,
    error,
  };
};
