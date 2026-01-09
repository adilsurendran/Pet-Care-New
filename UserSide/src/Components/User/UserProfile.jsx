import React, { useEffect, useState } from "react";
import axios from "axios";
import UserSidebar from "./UserSidebar";
import "./UserPremium.css";
// import "./UserProfile.css"; // Using premium styles
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaCity, FaEdit, FaSave, FaTimes } from "react-icons/fa";

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

  return (
    <div className="user-layout">
      <UserSidebar />
      <main className="user-main">
        <header className="panel-header">
          <h1 className="panel-title">My <span>Profile</span></h1>
          <p className="panel-subtitle">Manage your personal information.</p>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading profile...</div>
        ) : (
          <div style={{ maxWidth: '800px' }}>
            <div style={{ background: 'white', borderRadius: '25px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>

              {/* Header Banner */}
              <div style={{ height: '150px', background: 'linear-gradient(135deg, var(--user-primary) 0%, #2e7d32 100%)', position: 'relative' }}></div>

              <div style={{ padding: '0 40px 40px 40px', position: 'relative' }}>
                {/* Avatar */}
                <div style={{
                  width: '120px', height: '120px', borderRadius: '50%', background: 'white', border: '5px solid white',
                  position: 'absolute', top: '-60px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                  <span style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--user-primary)' }}>
                    {profile?.userFullname?.charAt(0).toUpperCase()}
                  </span>
                </div>

                <div style={{ paddingTop: '70px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: '2rem', color: '#1e293b' }}>{profile?.userFullname}</h2>
                    <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>Member since {new Date().getFullYear()}</p>
                  </div>
                  {!showEdit && (
                    <button
                      onClick={() => setShowEdit(true)}
                      style={{
                        padding: '12px 25px', borderRadius: '12px', background: 'var(--user-primary)', color: 'white',
                        border: 'none', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                        boxShadow: '0 4px 10px rgba(76, 175, 80, 0.3)'
                      }}
                    >
                      <FaEdit /> Edit Profile
                    </button>
                  )}
                </div>

                {showEdit ? (
                  <form onSubmit={updateProfile} style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155' }}>Full Name</label>
                      <input
                        className="premium-input"
                        value={form.userFullname || ""}
                        onChange={(e) => setForm({ ...form, userFullname: e.target.value })}
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155' }}>Email</label>
                      <input
                        className="premium-input"
                        value={form.userEmail || ""}
                        onChange={(e) => setForm({ ...form, userEmail: e.target.value })}
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155' }}>City</label>
                      <input
                        className="premium-input"
                        value={form.city || ""}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155' }}>State</label>
                      <input
                        className="premium-input"
                        value={form.state || ""}
                        onChange={(e) => setForm({ ...form, state: e.target.value })}
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#334155' }}>Pincode</label>
                      <input
                        className="premium-input"
                        value={form.pincode || ""}
                        onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                      />
                    </div>
                    <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '15px', marginTop: '10px' }}>
                      <button type="submit" style={{ flex: 1, padding: '12px', background: 'var(--user-primary)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                        <FaSave /> Save Changes
                      </button>
                      <button type="button" onClick={() => setShowEdit(false)} style={{ flex: 1, padding: '12px', background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                        <FaTimes /> Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <FaEnvelope style={{ color: '#94a3b8' }} />
                      <div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Email</div>
                        <div style={{ fontWeight: '600', color: '#334155' }}>{profile.userEmail}</div>
                      </div>
                    </div>
                    <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <FaCity style={{ color: '#94a3b8' }} />
                      <div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>City</div>
                        <div style={{ fontWeight: '600', color: '#334155' }}>{profile.city}</div>
                      </div>
                    </div>
                    <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <FaMapMarkerAlt style={{ color: '#94a3b8' }} />
                      <div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>State</div>
                        <div style={{ fontWeight: '600', color: '#334155' }}>{profile.state}</div>
                      </div>
                    </div>
                    <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <FaMapMarkerAlt style={{ color: '#94a3b8' }} />
                      <div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Pincode</div>
                        <div style={{ fontWeight: '600', color: '#334155' }}>{profile.pincode}</div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
