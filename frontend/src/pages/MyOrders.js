import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PubicLayout";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FaBoxOpen, FaInfoCircle, FaMapMarkedAlt } from "react-icons/fa";

const MyOrders = () => {
  const userId = localStorage.getItem("userId");
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    fetch(`http://127.0.0.1:8000/api/orders/${userId}/`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, [userId, navigate]);

  return (
    <PublicLayout>
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="container py-5">
        <h3 className="text-center text-primary mb-4">
          <FaBoxOpen className="text-warning me-2" size={50} />
          My Orders
        </h3>

        {orders.length === 0 ? (
          <p className="text-center text-muted">
            You have not placed any orders yet.
          </p>
        ) : (
          orders.map((order, index) => (
            <div className="card mb-4 shadow-sm" key={index}>
              <div className="card-body d-flex justify-content-between align-items-center">

                {/* LEFT: ICON + INFO */}
                <div className="d-flex align-items-center">
                  <FaBoxOpen className="text-warning me-3" size={50} />

                  <div>
                    <h5 className="mb-1">
                      <Link
                        to={`/order/${order.order_number}`}
                        className="text-decoration-none text-primary"
                      >
                        Order # {order.order_number}
                      </Link>
                    </h5>

                    <p className="text-muted mb-1">
                      <strong>Date:</strong>{" "}
                      {new Date(order.order_time).toLocaleString()}
                    </p>

                    <span className="badge rounded-pill bg-secondary px-3 py-2">
                      {order.order_final_status}
                    </span>
                  </div>
                </div>

                {/* RIGHT: ACTION BUTTONS */}
                <div className="d-flex">
                  <Link
                    to={`/track/${order.order_number}`}
                    className="btn btn-outline-secondary btn-sm me-2"
                  >
                    <FaMapMarkedAlt className="me-1" />
                    Track
                  </Link>

                  <Link
                    to={`/order/${order.order_number}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    <FaInfoCircle className="me-1" />
                    View Details
                  </Link>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </PublicLayout>
  );
};

export default MyOrders;
