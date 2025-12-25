import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");

  //   const [username, setUsername] = useState('');
  //   const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/add-category/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category_name: categoryName }),
      });
      const data = await response.json();

      if (response.status === 201) {
        toast.success(data.message);

        //  setTimeout(() =>{
        //   window.location.href = '/admin-dashboard';
        //  },2000)
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error connecting to the server");
    }
  };
  return (
    <AdminLayout>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="row">
        {/* CỘT TRÁI */}
        <div className="col-md-8">
          <div className="p-4 shadow-sm rounded bg-white">
            <h4 className="mb-4">
              <i className="fas fa-plus-circle text-primary me-2"></i>
              Add Category
            </h4>

            <form onSubmit={handleSubmit}>
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
                Add Category
              </button>
            </form>
          </div>
        </div>

        {/* CỘT PHẢI */}
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

export default AddCategory;
