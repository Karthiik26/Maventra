import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import type { Post } from "../Utils/types";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTags] = useState("");

  const { createPost, loading, error } = useBlog();
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const tagList = tag
      .split(",")
      .map((t) => t.trim())
      .filter((Ft) => Ft !== "");

    const payload: Post = {
      title,
      subTitle,
      content,
      tag: tagList,
    };

    console.log("Payload:", payload);

    const res = await createPost(payload);

    console.log("Response:", res);

    if (res?.success) {
      alert("Post created successfully!");
      navigate("/");
    } else {
      alert("Failed to create post. Please try again.");
    }
  } catch (error) {
    console.error("Error creating post:", error);
    alert("An unexpected error occurred.");
  }
};


  return (
    <div className="d-flex align-items-center justify-content-center py-4">
      <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "800px" }}>
        <form onSubmit={handleSubmit}>
          <h3 className="mb-4">Create Post</h3>

          <input
            className="form-control mb-3"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="subTitle"
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
            value={tag}
            onChange={(e) => setTags(e.target.value)}
            required
          />

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="d-grid">
            <button
              className="btn btn-success"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
