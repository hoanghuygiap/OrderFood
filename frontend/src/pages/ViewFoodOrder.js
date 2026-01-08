import React, { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../components/AdminLayout";
import { ToastContainer, toast } from "react-toastify";


const ViewFoodOrder = () => {
  // 1. Destructure chính xác tên param từ URL (Giả sử route là :order_number)
  const { order_number } = useParams();
  const adminUser = localStorage.getItem("adminUser");
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null); // Thêm state để quản lý lỗi

  useEffect(() => {
    if (!adminUser) {
      navigate("/admin-login");
      return;
    }

    // 2. Sử dụng order_number đã destructure
    fetch(`http://127.0.0.1:8000/api/view-order-detail/${order_number}`)
      .then((res) => {
        if (!res.ok) throw new Error("Dữ liệu không tồn tại hoặc lỗi server");
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setData(data);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
    // 3. Thêm đầy đủ dependencies để hết lỗi ESLint
  }, [order_number, adminUser, navigate]);

  // Hiển thị trạng thái lỗi nếu có
  if (error)
    return (
      <AdminLayout>
        <p className="text-center text-danger mt-5">Lỗi: {error}</p>
      </AdminLayout>
    );

  // Hiển thị loading
  if (!data)
    return (
      <AdminLayout>
        <p className="text-center mt-5">Loading ...</p>
      </AdminLayout>
    );

  const { order, foods, tracking } = data;
  const statusOptions = [
    "Order Confirmed",
    "Food Being Prepared",
    "Food Pickup",
    "Food Delivered",
    "Order Cancelled",
  ];

  const currentStatus = order.order_final_status || "";
  const visibleStatusOptions = statusOptions.slice(statusOptions.indexOf(currentStatus) + 1 );


  return (
    <AdminLayout>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="container mt-4">
        {/* 4. Sử dụng Optional Chaining (?.) để an toàn tuyệt đối */}
        <h3 className="text-center text-primary mb-4">
          Order Details #{order.order_number}
        </h3>
        <div className="row">
          <div className="col-md-6">
            <h5>User Info</h5>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>First Name</th>
                  <td>{order.user_first_name}</td>
                </tr>
                <tr>
                  <th>Last Name</th>
                  <td>{order.user_last_name}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{order.user_email}</td>
                </tr>
                <tr>
                  <th>Mobile</th>
                  <td>{order.user_mobile}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>{order.user_address}</td>
                </tr>
                <tr>
                  <th>Order Time</th>
                  <td>{new Date(order.order_time).toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Final Status</th>
                  <td>{order.order_final_status || "Pending"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-6">
            <h5>Ordered Foods</h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {foods.map((food, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={`http://127.0.0.1:8000${food.image}`}
                        alt={food.item_name}
                        width="60"
                        height="60"
                      />
                    </td>
                    <td>{food.item_name}</td>
                    <td>{food.item_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h5 className="mt-4">Tracking History</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Remark</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {tracking.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No tracking history available.
                  </td>
                </tr>
              ) : (
                tracking.map((track, index) => (
                  <tr key={index}>
                    <td>{track.status}</td>
                    <td>{track.remark}</td>
                    <td>{new Date(track.status_date).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

        {order.order_final_status !== "Food Delivered" && (
          <div className='my-4'>
            <h5>Update Order Status</h5>
            <form onSubmit={(e) => {
              e.preventDefault();
              const status = e.target.status.value;
              const remark = e.target.remark.value;
              fetch("http://127.0.0.1:8000/api/update-order-status/", {
            method: "POST",
            headers: {
                  'Content-Type': 'application/json'},
                  body: JSON.stringify({ 
                    order_number: order.order_number,
                    status, 
                    remark, }),
              }) 
            .then((res) => res.json())
            .then((res) => {
               console.log("Response từ server:", res);
                 if(res.message){
                  toast.success(res.message);
                  setTimeout(() =>
                    window.location.reload(), 1000);
                 }

            else {
              toast.error(res.error || 'Failed to update status'); 
            }
            }).catch((err) => {
              console.error("Fetch error:", err);
              toast.error('Server error. Please try again later.');
            });
              // Add your update logic here
            }}>
              <div className="mb-3">
                <label>Status</label>
                <select name="status" className="form-control" required>
                  {visibleStatusOptions.map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                  ))}
                </select> 
              </div>
              <div className="mb-3">
                <label>Remark</label>
                <textarea name="remark" className="form-control" rows={3} required>
                </textarea> 
                <div className="text-center">
                  <button type="submit" className="btn btn-success">
                    Update Status
                  </button>
              </div>
              </div>
            </form>
          </div>
        )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ViewFoodOrder;
