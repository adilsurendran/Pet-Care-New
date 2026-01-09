
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Community.css";
import ShopSidebar from "../Shop/ShopSidebar";
import "../Shop/ShopPremium.css";
import DoctorSidebar from "../Doctor/DoctorSidebar";
import "../Doctor/DoctorPremium.css";

export default function Community() {
  const userId = localStorage.getItem("user");
  const userFullname = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null
  });
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedPostComments, setSelectedPostComments] = useState([]);
  const [selectedPostTitle, setSelectedPostTitle] = useState("");

  const loadPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/community/posts");
      setPosts(res.data);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const viewComments = (post) => {
    setSelectedPostComments(post.comments);
    setSelectedPostTitle(post.title);
    setShowCommentsModal(true);
  };

  /* ================= CREATE POST ================= */
  const submitPost = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);
      data.append("userId", userId);
      data.append("userFullname", userFullname);
      data.append("role", role);
      if (form.image) data.append("image", form.image);

      await axios.post("http://localhost:5000/api/community/post", data);
      setForm({ title: "", description: "", image: null });
      setShowModal(false);
      loadPosts();
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  /* ================= LIKE ================= */
  const likePost = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/community/like/${id}`, {
        userId
      });
      loadPosts();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  /* ================= COMMENT ================= */
  const commentPost = async (id) => {
    if (!commentText.trim()) return;

    try {
      await axios.post(`http://localhost:5000/api/community/comment/${id}`, {
        userId,
        userFullname,
        text: commentText
      });
      setCommentText("");
      loadPosts();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  /* ================= DELETE ================= */
  const deletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/community/post/${id}`);
      loadPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const userPosts = posts.filter(post => post.postedBy.userId === userId);
  const otherPosts = posts.filter(post => post.postedBy.userId !== userId);

  const content = (
    <div className="community-container">
      {/* Modal for creating new post */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Create New Post</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <form className="post-form" onSubmit={submitPost}>
              <div className="form-group">
                <input
                  placeholder="Post Title *"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="What would you like to share? *"
                  required
                  rows="4"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="file-label">
                  <span>Add Image (Optional)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                    className="file-input"
                  />
                </label>
                {form.image && (
                  <p className="file-name">{form.image.name}</p>
                )}
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Post to Community
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCommentsModal && (
        <div className="modal-overlay">
          <div className="modal-content comments-modal">
            <div className="modal-header">
              <h3>Comments for: {selectedPostTitle}</h3>
              <button className="close-btn" onClick={() => setShowCommentsModal(false)}>
                ×
              </button>
            </div>
            <div className="comments-list">
              {selectedPostComments.length === 0 ? (
                <div className="no-comments">No comments yet</div>
              ) : (
                selectedPostComments.map((comment, index) => (
                  <div className="comment-item" key={index}>
                    <div className="comment-header">
                      <span className="comment-author">{comment.userFullname}</span>
                      <span className="comment-role">{comment.userRole || role}</span>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                    <span className="comment-time">
                      {new Date(comment.createdAt || Date.now()).toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>
            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setShowCommentsModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="community-header">
        <h1>Community Hub</h1>
        <p>Connect, share, and engage with the community</p>
      </div>

      <div className="community-layout">
        {/* Left Column - Community Posts */}
        <div className="community-feed">
          <div className="section-header">
            <h2>Community Feed</h2>
            <div className="post-count">{otherPosts.length} posts</div>
          </div>

          {otherPosts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No posts yet</h3>
              <p>Be the first to share something with the community!</p>
            </div>
          ) : (
            otherPosts.map((p) => (
              <div className="post-card" key={p._id}>
                <div className="post-header">
                  <div className="user-info">
                    <div className="avatar">
                      {p.postedBy.userFullname.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="user-name">{p.postedBy.userFullname}</div>
                      <div className="post-meta">
                        <span className="user-role">{p.postedBy.role}</span>
                        <span className="post-time">
                          {new Date(p.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  {p.postedBy.userId === userId && (
                    <button
                      className="btn-delete"
                      onClick={() => deletePost(p._id)}
                      title="Delete post"
                    >
                      🗑️
                    </button>
                  )}
                </div>

                <div className="post-content">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>

                  {p.image && (
                    <div className="post-image">
                      <img
                        src={`http://localhost:5000/uploads/${p.image}`}
                        alt={p.title}
                      />
                    </div>
                  )}
                </div>

                <div className="post-actions">
                  <button
                    className={`like-btn ${p.likes.includes(userId) ? 'liked' : ''}`}
                    onClick={() => likePost(p._id)}
                  >
                    <span className="heart-icon">❤️</span>
                    <span className="like-count">{p.likes.length}</span>
                  </button>

                  <div className="comment-section">
                    <div className="comments">
                      {p.comments.slice(0, 2).map((c, i) => (
                        <div className="comment-item" key={i}>
                          <span className="comment-author">{c.userFullname}:</span>
                          <span className="comment-text">{c.text}</span>
                        </div>
                      ))}
                      {p.comments.length > 2 && (
                        <div className="more-comments">
                          +{p.comments.length - 2} more comments
                        </div>
                      )}
                    </div>

                    <div className="comment-input">
                      <input
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && commentPost(p._id)}
                      />
                      <button
                        className="send-btn"
                        onClick={() => commentPost(p._id)}
                        disabled={!commentText.trim()}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Column - User Posts & Actions */}
        <div className="user-sidebar">
          <div className="user-profile">
            <div className="profile-header">
              <div className="profile-avatar">
                {userFullname ? userFullname.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <h3>{userFullname}</h3>
                <p className="profile-role">{role}</p>
              </div>
            </div>

            <button
              className="add-post-btn"
              onClick={() => setShowModal(true)}
            >
              <span className="plus-icon">+</span>
              Create New Post
            </button>
          </div>

          <div className="my-posts-section">
            <div className="section-header">
              <h3>My Posts</h3>
              <span className="post-count">{userPosts.length}</span>
            </div>

            {userPosts.length === 0 ? (
              <div className="empty-my-posts">
                <p>You haven't created any posts yet</p>
                <button
                  className="btn-create-first"
                  onClick={() => setShowModal(true)}
                >
                  Create your first post
                </button>
              </div>
            ) : (
              <div className="my-posts-list">
                {userPosts.map((p) => (
                  <div
                    className="my-post-card"
                    key={p._id}
                    onClick={() => viewComments(p)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="my-post-header">
                      <h4>{p.title}</h4>
                      <button
                        className="delete-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePost(p._id);
                        }}
                        title="Delete post"
                      >
                        🗑️
                      </button>
                    </div>
                    <p className="my-post-desc">
                      {p.description.length > 100
                        ? `${p.description.substring(0, 100)}...`
                        : p.description}
                    </p>
                    <div className="my-post-stats">
                      <span className="stat-item">❤️ {p.likes.length} likes</span>
                      <span className="stat-item" onClick={(e) => {
                        e.stopPropagation();
                        viewComments(p);
                      }}>
                        💬 {p.comments.length} comments
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="community-stats">
            <h3>Community Stats</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{posts.length}</div>
                <div className="stat-label">Total Posts</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">
                  {posts.reduce((acc, post) => acc + post.comments.length, 0)}
                </div>
                <div className="stat-label">Comments</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (role === "shop") {
    return (
      <div className="shop-layout">
        <ShopSidebar />
        <main className="shop-main">
          {content}
        </main>
      </div>
    );
  }

  if (role === "doctor") {
    return (
      <div className="doctor-layout">
        <DoctorSidebar />
        <main className="doctor-main">
          {content}
        </main>
      </div>
    );
  }

  return content;
}
