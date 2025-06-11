import { Link, useNavigate } from "react-router-dom";
import type { Post } from "../Utils/types";

const PostCard = ({
  post,
  isLoggedUser,
  onClickDelete,
}: {
  post: Post;
  isLoggedUser?: boolean;
  onClickDelete?: (id: string) => void;
}) => {
  const navigate = useNavigate();

  const formattedDate = new Date(post?.createdAt ?? "").toLocaleDateString(
    "en-IN",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body d-flex flex-column">
        <Link
          to={`/post/${post._id}`}
          className="text-decoration-none text-dark"
        >
          <h5 className="card-title">{post.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{post.subTitle}</h6>
        </Link>

        <p className="card-text mt-2">
          {post.content.length > 100
            ? post.content.substring(0, 100) + "..."
            : post.content}
        </p>

        <div className="mb-2">
          {post.tag?.map((tag) => (
            <span key={tag} className="badge bg-secondary me-1">
              {tag}
            </span>
          ))}
        </div>

        <div className="text-muted mb-2" style={{ fontSize: "0.9rem" }}>
          By <strong>{post.author?.name || "Unknown Author"}</strong> on{" "}
          {formattedDate}
        </div>

        {isLoggedUser ? (
          <div className="d-flex justify-content-between mt-auto pt-2">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => navigate(`/edit/${post._id}`)}
            >
              Edit
            </button>
            <button
              onClick={() => post._id && onClickDelete?.(post._id)}
              className="btn btn-sm btn-outline-danger"
            >
              Delete
            </button>
          </div>
        ) : (
          <Link
            to={`/post/${post._id}`}
            className="btn btn-sm btn-outline-primary mt-auto"
          >
            Read more
          </Link>
        )}
      </div>
    </div>
  );
};

export default PostCard;
