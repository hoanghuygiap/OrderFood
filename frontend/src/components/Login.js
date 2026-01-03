import React, { useState } from "react";
import PublicLayout from "./PubicLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    emailcont: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.status === 201 || response.ok) {
        toast.success("Đăng nhập thành công");
        localStorage.setItem("userId", result.userId);
        localStorage.setItem("userName", result.userName);

        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error(result.message || "Thông tin đăng nhập không hợp lệ");
      }
    } catch (error) {
      toast.error("Lỗi khi kết nối đến máy chủ");
    }
  };

  return (
    <PublicLayout>
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="card shadow-lg p-4 rounded-4"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h3 className="text-center text-primary mb-4">
            <i className="fas fa-user-lock me-2"></i>
            User Login
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="fas fa-envelope text-primary"></i>
                </span>
                <input
                  type="text"
                  name="emailcont"
                  className="form-control"
                  placeholder="Nhập email"
                  value={formData.emailcont}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="fas fa-lock text-primary"></i>
                </span>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Nhập mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button className="btn btn-primary w-100 py-2 rounded-3">
              <i className="fas fa-sign-in-alt me-2"></i>
              Login
            </button>

            <p className="text-center mt-3 mb-0 text-muted">
              Chưa có tài khoản? <a href="/register">Register</a>
            </p>
          </form>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Login;
