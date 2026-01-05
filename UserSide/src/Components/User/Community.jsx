import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Community.css";

export default function Community() {
  const userId = localStorage.getItem("user");
  const userFullname = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null
  });

  const loadPosts = async () => {
    const res = await axios.get("http://localhost:5000/api/community/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  /* ================= CREATE POST ================= */
  const submitPost = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("userId", userId);
    data.append("userFullname", userFullname);
    data.append("role", role);
    if (form.image) data.append("image", form.image);

    await axios.post("http://localhost:5000/api/community/post", data);
    setForm({ title: "", description: "", image: null });
    loadPosts();
  };

  /* ================= LIKE ================= */
  const likePost = async (id) => {
    await axios.put(`http://localhost:5000/api/community/like/${id}`, {
      userId
    });
    loadPosts();
  };

  /* ================= COMMENT ================= */
  const commentPost = async (id) => {
    if (!commentText) return;
    await axios.post(`http://localhost:5000/api/community/comment/${id}`, {
      userId,
      userFullname,
      text: commentText
    });
    setCommentText("");
    loadPosts();
  };

  /* ================= DELETE ================= */
  const deletePost = async (id) => {
    if (!window.confirm("Delete post?")) return;
    await axios.delete(`http://localhost:5000/api/community/post/${id}`);
    loadPosts();
  };

  return (
    <div className="community-page">

      {/* ===== ADD POST ===== */}
      <form className="post-form" onSubmit={submitPost}>
        <input
          placeholder="Title"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="What's on your mind?"
          required
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />
        <button>Post</button>
      </form>

      {/* ===== POSTS ===== */}
      {posts.map((p) => (
        <div className="post-card" key={p._id}>
          <div className="post-header">
            <b>{p.postedBy.userFullname}</b>
            <span className="role">{p.postedBy.role}</span>
            {p.postedBy.userId === userId && (
              <button onClick={() => deletePost(p._id)}>Delete</button>
            )}
          </div>

          <h4>{p.title}</h4>
          <p>{p.description}</p>

          {p.image && (
            <img
              src={`http://localhost:5000/uploads/${p.image}`}
              alt=""
            />
          )}

          <div className="post-actions">
            <button onClick={() => likePost(p._id)}>
              ❤️ {p.likes.length}
            </button>
          </div>

          {/* COMMENTS */}
          <div className="comments">
            {p.comments.map((c, i) => (
              <p key={i}>
                <b>{c.userFullname}:</b> {c.text}
              </p>
            ))}
          </div>

          <div className="comment-box">
            <input
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button onClick={() => commentPost(p._id)}>Send</button>
          </div>
        </div>
      ))}
    </div>
  );
}
