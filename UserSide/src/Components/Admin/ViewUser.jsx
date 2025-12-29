import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewUser = () => {
  const [users, setUsers] = useState([]);

  // Fetch Users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getallusers");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Handle Delete User
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/${userId}`);
      setUsers(users.filter((user) => user._id !== userId)); // Update UI
      console.log("User deleted successfully");

      // Store deleted user ID in localStorage (if needed)
      localStorage.setItem("userId", userId);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <div className="container-fluid d-flex justify-content-center">
        <table className="table table-dark mt-5" style={{ width: "700px" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>State</th>
              <th>Pincode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.userFullname}</td>
                  <td>{user.userEmail}</td>
                  <td>{user.city}</td>
                  <td>{user.state}</td>
                  <td>{user.pincode}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewUser;
