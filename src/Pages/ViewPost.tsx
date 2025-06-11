import { useParams } from "react-router-dom";
import { dummyPosts } from "../Utils/dummyData";
import { useBlog } from "../hooks/useBlog";
import { useEffect, useState } from "react";
import type { Post } from "../Utils/types";

const ViewPost = () => {
  const { id } = useParams();

  const [post, setPost] = useState<Post>();

  const { getPostById } = useBlog();

  useEffect(() => {
    const getPostByPostId = async () => {
      const res = await getPostById(id ?? "");
      setPost(res.blog);
    };
    getPostByPostId();
  }, [id]);

  if (!post) return <p>Post not found</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div>
        {post.tag.map((tag) => (
          <span key={tag} className="badge bg-secondary me-1">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ViewPost;
