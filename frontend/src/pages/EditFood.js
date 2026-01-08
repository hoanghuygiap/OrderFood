import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";

const EditFood = () => {
  const { id } = useParams();
  const adminUser = localStorage.getItem("adminUser");
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    item_name: "",
    item_price: "",
    item_description: "",
    image: "",
    item_quantity: "",
    is_available: false,
  });

  useEffect(() => {
    if (!adminUser) {
      navigate("/admin-login");
      return;
    }

    // Load food item
    fetch(`http://127.0.0.1:8000/api/edit-food/${id}/`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error(err));

    // Load categories
    fetch(`http://127.0.0.1:8000/api/categories/`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, [id, adminUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("category", formData.category);
    data.append("item_name", formData.item_name);
    data.append("item_description", formData.item_description);
    data.append("item_quantity", formData.item_quantity);
    data.append("item_price", formData.item_price);
    data.append("image", formData.image);
    data.append("is_available", formData.is_available);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/edit-food/${id}/`,
        {
          method: "PUT",
          body: data,
        }
      );
      const result = await response.json();

      if (response.status === 200) {
        toast.success(result.message || "Food item updated successfully");
        setTimeout(() => {
          navigate("/manage-food");
        }, 2000);
      } else {
        toast.error(result.message || "Failed to update food item");
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
        {/* LEFT COLUMN */}
        <div className="col-md-8">
          <div className="p-4 shadow-sm rounded bg-white">
            <h4 className="mb-4">
              <i className="fas fa-pen-square text-primary me-2"></i>
              Edit Food Item
            </h4>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Category */}
              <div className="mb-3">
                <label className="form-label">Food Category</label>
                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.category_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Item name */}
              <div className="mb-3">
                <label className="form-label">Food Item Name</label>
                <input
                  name="item_name"
                  type="text"
                  className="form-control"
                  placeholder="Enter food item name"
                  value={formData.item_name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="item_description"
                  className="form-control"
                  placeholder="Enter description"
                  value={formData.item_description}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Quantity */}
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  name="item_quantity"
                  type="text"
                  className="form-control"
                  value={formData.item_quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Price */}
              <div className="mb-3">
                <label className="form-label">Price (VND)</label>
                <input
                  name="item_price"
                  type="number"
                  step="10000"
                  value={formData.item_price}
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Availability */}
              <div className="mb-3 form-check form-switch">
                <input
                  name="is_available"
                  type="checkbox"
                  checked={formData.is_available}
                  className="form-check-input"
                  onChange={(e) =>
                    setFormData({ ...formData, is_available: e.target.checked })
                  }
                />
                <label className="form-check-label">
                  {formData.is_available ? "Available" : "Not Available"}
                </label>
              </div>

              {/* Image */}
              <div className="mb-3">
                <label className="form-label">Image</label>
                <div className="row">
                  <div className="col-md-6">
                    <input
                      name="image"
                      type="file"
                      accept="image/*"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="col-md-6">
                    {formData.image && typeof formData.image === "string" && (
                      <img
                        src={`http://127.0.0.1:8000${formData.image}`}
                        alt="Food"
                        className="img-fluid"
                        style={{
                          maxHeight: "100px",
                          padding: "4px",
                          border: "1px solid red",
                          borderRadius: "8px",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary mt-3">
                <i className="fas fa-save me-2"></i>
                Update Food Item
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <i
            className="fas fa-pizza-slice"
            style={{ fontSize: "180px", color: "#e5e5e5" }}
          ></i>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditFood;
