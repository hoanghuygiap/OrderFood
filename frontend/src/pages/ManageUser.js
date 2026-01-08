import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { Link, useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageUser = () => {
  const adminUser = localStorage.getItem("adminUser");
  const Navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (!adminUser) {
      Navigate("/admin-login");
      return;
    }
  }, [adminUser, Navigate]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users/")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.message) toast.success(data.message);
        const usersData = Array.isArray(data) ? data : data.users || [];
        setUsers(usersData);
        setAllUsers(usersData);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        toast.error("Error fetching users");
      });
  }, []);

  const handleSearch = (s) => {
    const keyword = (s || "").toLowerCase();

    if (!keyword) {
      setUsers(allUsers);
    } else {
      const filtered = allUsers.filter((u) => {
        const first = (u.first_name || "").toLowerCase();
        const last = (u.last_name || "").toLowerCase();
        const email = (u.email || "").toLowerCase();
        return (
          first.includes(keyword) || last.includes(keyword) || email.includes(keyword)
        );
      });
      setUsers(filtered);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(`http://127.0.0.1:8000/api/delete_user/${id}/`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.message) toast.success(data.message);
          setUsers((prev) => prev.filter((user) => user.id !== id));
          setAllUsers((prev) => prev.filter((user) => user.id !== id));
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to delete user");
        });
    }
  };
  
  return (
   <AdminLayout>
      <ToastContainer position="top-center" autoClose={2000} />
      <div>
        <h3 className="text-center text-primary mb-4">
          <i className="fas fa-list-alt me-1"></i>User List
        </h3>

        <h5 className="text-end text-muted">
          <i className="fas fa-database me-1"></i>Total Users
          <span className="badge bg-success ms-2">{users.length}</span>
        </h5>
        <div className="mb-3 d-flex justify-content-between">
          <input
            type="text"
            className="form-control w-50 "
            placeholder="Search by name or email..."
            onChange={(e) => handleSearch(e.target.value)}
          ></input>

          <CSVLink
            data={users}
            className="btn btn-success"
            filename={"user_list.csv"}
          >
            <i className="fas fa-file-csv me-2"></i>Export to CSV
          </CSVLink>
        </div>

        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>S.no</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.first_name || "-"}</td>
                <td>{user.last_name || "-"}</td>
                <td>{user.email || "-"}</td>
                <td>{user.mobile || "-"}</td>
                <td>{
                  (user.date_joined || user.creation_date || user.created_at || user.registered_at)
                    ? new Date(user.date_joined || user.creation_date || user.created_at || user.registered_at).toLocaleString()
                    : "-"
                }</td>
                <td>
                  <Link
                    to={`/edit_user/${user.id}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    <i className="fas fa-edit  me-1"></i>Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-sm btn-danger"
                  >
                    <i className="fas fa-trash-alt me-1"></i>Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
};

export default ManageUser;