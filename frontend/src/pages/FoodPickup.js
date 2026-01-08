import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const FoodPickup = () =>{
    const [orders, setOrders] = useState([]);
    const adminUser = localStorage.getItem("adminUser");
    const navigate = useNavigate();

  
  useEffect(() => {
    if (!adminUser) {
        navigate("/admin-login");
        return;
        }

    fetch("http://127.0.0.1:8000/api/foodpickup/")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        
      });
  }, []);
  

    return(
        <AdminLayout>
      <div>
        <h3 className="text-center text-primary mb-4">
          <i className="fas fa-list-alt me-1"></i>Detail of Order Pickup
          {/* {JSON.stringify(categories)} */}
        </h3>

        <h5 className="text-end text-muted">
          <i className="fas fa-database me-1"></i>Total 
          <span className="badge bg-success ms-2">{orders.length}</span>
        </h5>
        

        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>S.no</th>
              <th>Order Number</th>
              <th>Order Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
                          <tr key = {order.id}>
                            <td>{index + 1}</td>
                            <td>{order.order_number}</td>
                            <td>{new Date(order.order_time).toLocaleString()}</td>
                            <td>
                                <Link to={`/admin-view-order-detail/${order.order_number}`} className="btn btn-sm btn-info text-white me-1">
                                    <i className="fas fa-edit me-2"></i> View Details
                                </Link>
                            
            
                              
                            </td>
                          </tr>
                        ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
    )
}
export default FoodPickup;