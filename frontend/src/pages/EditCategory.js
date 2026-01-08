import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";

const EditCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const { id } = useParams();
  const adminUser = localStorage.getItem("adminUser");
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminUser) {
      navigate("/admin-login");
      return;
    }

    fetch(`http://127.0.0.1:8000/api/category/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.category_name) {
          setCategoryName(data.category_name);
        } else {
          toast.error("Category not found");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error loading category data");
      });
  }, [id, adminUser, navigate]);

  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`http://127.0.0.1:8000/api/category/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category_name: categoryName }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          toast.success(data.message || "Category updated successfully");
          setTimeout(() => {
            navigate("/manage-category");
          }, 2000);
        } else {
          toast.error("Failed to update category");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error updating category");
      });
  };

  return (
    <AdminLayout>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="row">
        {/* LEFT COLUMN */}
        <div className="col-md-8">
          <div className="p-4 shadow-sm rounded bg-white">
            <h4 className="mb-4">
              <i className="fas fa-pen-square text-primary me-2"></i>
              Edit Food Category
            </h4>

            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="form-label">Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter category name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary mt-3">
                <i className="fas fa-plus me-2"></i>
                Update Category
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <i
            className="fas fa-utensils"
            style={{ fontSize: "180px", color: "#e5e5e5" }}
          ></i>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditCategory;
