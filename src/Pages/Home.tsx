import { useEffect, useState } from "react";
import { useBlog } from "../hooks/useBlog";
import PostCard from "../Components/PostCard";
import type { Post, User } from "../Utils/types";

const Home = () => {
  const [tag, setTag] = useState("");
  const [userData, setUserData] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const { getAllPosts, deletePost, getPostsByTag, loading, error } = useBlog();

  useEffect(() => {
    const loggedUser = localStorage.getItem("LoggedUser");

    if (loggedUser) {
      try {
        const parsedUser = JSON.parse(loggedUser);
        setUserData(parsedUser);
      } catch (err) {
        console.error("Invalid JSON in LoggedUser", err);
        setUserData(null);
      }
    } else {
      setUserData(null);
    }
  }, []);

  const fetchData = async () => {
    let data;
    if (tag.trim() === "") {
      data = await getAllPosts();
    } else {
      data = await getPostsByTag(tag.trim());
    }

    if (data?.blogs) setPosts(data.blogs);
  };
  useEffect(() => {
    fetchData();
  }, [tag]);

  const myPosts = posts.filter(
    (post) => post.author && post.author._id === userData?.id
  );
  const otherPosts = posts.filter(
    (post) => post.author && post.author._id !== userData?.id
  );

  console.log(userData);
  console.log(myPosts);

  const handleDelete = async (id: string) => {
    try {
      const res = await deletePost(id);
      if (res.success) {
        alert(res.message);
        fetchData();
      } else {
        alert("Blog Is Not Deleted");
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center w-100 mb-4">
        <h2 className="mb-3 text-center">All Articles</h2>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <input
            className="form-control"
            placeholder="Filter by tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </div>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {myPosts.length > 0 && (
        <>
          <h4 className="mb-3 text-primary">Your Articles</h4>
          <div className="row">
            {myPosts.map((post) => (
              <div key={post._id} className="col-md-4 mb-4">
                <PostCard
                  post={post}
                  isLoggedUser={post.author && post.author._id === userData?.id}
                  onClickDelete={(id) => handleDelete(id)}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {otherPosts.length > 0 && (
        <>
          <h4 className="mt-5 mb-3 text-secondary">Community Articles</h4>
          <div className="row">
            {otherPosts.map((post) => (
              <div key={post._id} className="col-md-4 mb-4">
                <PostCard isLoggedUser={false} post={post} />
              </div>
            ))}
          </div>
        </>
      )}

      {!loading && posts.length === 0 && (
        <p className="text-center text-muted">No articles found.</p>
      )}
    </>
  );
};

export default Home;
