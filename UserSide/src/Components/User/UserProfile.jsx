import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserProfile.css";

export default function UserProfile() {
  const userId = localStorage.getItem("user");

  const [profile, setProfile] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);

  // -----------------------
  // Fetch profile
  // -----------------------
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/users/profile/${userId}`
      );
      setProfile(res.data);
      setForm(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load profile", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchProfile();
  }, [userId]);

  // -----------------------
  // Update profile
  // -----------------------
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/users/profile/${userId}`,
        form
      );
      setShowEdit(false);
      fetchProfile();
    } catch (err) {
      console.error("Update failed", err);
      alert("Profile update failed");
    }
  };

  if (loading) return <p className="empty-text">Loading profile...</p>;

  return (
    <div className="user-profile-page">
      <div className="profile-card">
        <h2>My Profile</h2>

        <div className="profile-row">
          <span>Name</span>
          <p>{profile.userFullname}</p>
        </div>

        <div className="profile-row">
          <span>Email</span>
          <p>{profile.userEmail}</p>
        </div>

        <div className="profile-row">
          <span>City</span>
          <p>{profile.city}</p>
        </div>

        <div className="profile-row">
          <span>State</span>
          <p>{profile.state}</p>
        </div>

        <div className="profile-row">
          <span>Pincode</span>
          <p>{profile.pincode}</p>
        </div>

        <button className="edit-btn" onClick={() => setShowEdit(true)}>
          Edit Profile
        </button>
      </div>

      {/* EDIT MODAL */}
      {showEdit && (
        <div className="modal-backdrop">
          <div className="profile-modal">
            <h3>Edit Profile</h3>

            <form onSubmit={updateProfile}>
              <input
                value={form.userFullname || ""}
                onChange={(e) =>
                  setForm({ ...form, userFullname: e.target.value })
                }
                placeholder="Full Name"
                required
              />

              <input
                value={form.userEmail || ""}
                onChange={(e) =>
                  setForm({ ...form, userEmail: e.target.value })
                }
                placeholder="Email"
                required
              />

              <input
                value={form.city || ""}
                onChange={(e) =>
                  setForm({ ...form, city: e.target.value })
                }
                placeholder="City"
                required
              />

              <input
                value={form.state || ""}
                onChange={(e) =>
                  setForm({ ...form, state: e.target.value })
                }
                placeholder="State"
                required
              />

              <input
                value={form.pincode || ""}
                onChange={(e) =>
                  setForm({ ...form, pincode: e.target.value })
                }
                placeholder="Pincode"
                required
              />

              <div className="modal-actions">
                <button type="submit">Update</button>
                <button type="button" onClick={() => setShowEdit(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
