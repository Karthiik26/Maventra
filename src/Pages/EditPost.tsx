import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import type { Post } from "../Utils/types";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPostById, updatePost } = useBlog();

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id!);
        if (data?.blog) {
          setTitle(data.blog.title || "");
          setSubTitle(data.blog.subTitle || "");
          setContent(data.blog.content || "");
          setTags((data.blog.tag || []).join(", "));
        }
      } catch (err) {
        console.error("Failed to load post:", err);
        setError("Failed to load post");
      }
    };

    if (id) fetchPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const updatedPost = {
      title,
      subTitle,
      content,
      tag: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      const res = await updatePost(id!, updatedPost);
      if (res.success) {
        alert("Post updated successfully!");
        navigate(`/`);
      } else {
        setError(res.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center py-4">
      <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "800px" }}>
        <form onSubmit={handleSubmit}>
          <h2 className="mb-4">Edit Post</h2>

          <input
            className="form-control mb-3"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="SubTitle"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            required
          />

          <textarea
            className="form-control mb-3"
            placeholder="Content"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          {error && <div className="alert alert-danger">{error}</div>}

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
