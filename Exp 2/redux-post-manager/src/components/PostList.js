import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../features/posts/postsSlice";

function PostList() {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  if (posts.length === 0) {
    return (
      <div>
        <h2>Posts</h2>
        <p>No posts available.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Posts</h2>

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3>{post.title}</h3>

          <p>{post.content}</p>

          <p>
            <strong>Platform:</strong> {post.platform}
          </p>

          <button onClick={() => dispatch(deletePost(post.id))}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default PostList;