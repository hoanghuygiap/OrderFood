import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PubicLayout"; // Bạn kiểm tra lại tên file/thư mục xem là Public hay Pubic nhé
import { useNavigate, useParams } from "react-router-dom"; // Bỏ chữ 'data' thừa ở đây

const OrderDetails = () => {
    const userId = localStorage.getItem("userId");
    const [orderItems, setOrderItems] = useState([]);
    
    // Khởi tạo null là ĐÚNG
    const [orderAddress, setOrderAddress] = useState(null); 
    const [total, setTotal] = useState(0);

    const navigate = useNavigate();
    const { order_number } = useParams();

    useEffect(() => {
        if (!userId) {
            navigate("/login");
            return;
        }

        // 1. Lấy danh sách món ăn
        fetch(`http://127.0.0.1:8000/api/orders/by_order_number/${order_number}/`)
            .then((res) => res.json())
            .then(data => {
                setOrderItems(data);
                const totalAmount = data.reduce(
                    (sum, item) => sum + item.food.item_price * item.quantity,
                    0
                );
                setTotal(totalAmount);
            })
            .catch(err => console.error("Lỗi lấy món:", err));


        // 2. Lấy địa chỉ (QUAN TRỌNG: Cần xử lý mảng/object)
        fetch(`http://127.0.0.1:8000/api/orders/order_address/${order_number}/`)
            .then((res) => res.json())
            .then(data => {
                // Kiểm tra nếu API trả về mảng [] thì lấy phần tử đầu tiên
                if (Array.isArray(data) && data.length > 0) {
                    setOrderAddress(data[0]);
                } else {
                    setOrderAddress(data);
                }
            })
            .catch(err => console.error("Lỗi lấy địa chỉ:", err));

    }, [order_number, navigate, userId]);


    return (
        <PublicLayout>
            <div className="container py-5">
                <h3 className="mb-4 text-primary">
                    <i className="fas fa-receipt me-2"></i> Order #{order_number} Details
                </h3>
                <div className="row">
                    {/* Cột bên trái: Danh sách món ăn */}
                    <div className="col-md-8">
                        {orderItems.map((item, index) => (
                            <div key={index} className="card mb-3 shadow-sm border-0">
                                <div className="row">
                                    <div className="col-md-4">
                                        <img
                                            src={`http://127.0.0.1:8000${item.food.image}`}
                                            className="img-fluid rounded-start"
                                            style={{ minHeight: "200px", height: "250px", width: '100%', objectFit: "cover" }}
                                            alt={item.food.item_name}
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5>{item.food.item_name} ({item.food.item_quantity})</h5>
                                            <p>{item.food.item_description}</p>
                                            <p> <strong>Price: </strong>{item.food.item_price} <strong> VND</strong></p>
                                            <p> <strong>Quantity: </strong>{item.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cột bên phải: Thông tin giao hàng */}
                    <div className="col-md-4">
                        {orderAddress && (
                            <div className="card shadow-sm border-0 bg-light p-3">
                                <h5 className="fq-semibold mb-3">
                                    <i className="fas fa-map-marker-alt me-2 text-danger"></i>Delivery Details
                                </h5>
                                <p><strong>Date: </strong>{new Date(orderAddress.order_time).toLocaleString()}</p>
                                <p><strong>Address: </strong>{orderAddress.address}</p>
                                <p><strong>Status: </strong>{orderAddress.order_final_status || "Waiting for Comfirmation"}</p>

                                <p><strong>Payment: </strong>
                                    <span className="badge bg-info text-danger ms-2 fs-6"> 
                                        {orderAddress.payment_mode}
                                    </span>
                                </p>
                                <p><strong>Total: </strong>{total}<strong> VND</strong></p>
                                
                                {/* Nút in hóa đơn */}
                                <a 
                                    href={`http://127.0.0.1:8000/api/invoice/${order_number}`} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="btn btn-primary w-100 my-2"
                                >
                                    <i className="fas fa-file-invoice me-2"></i>Invoice
                                </a>

                                {/* Nút hủy đơn - Tạm thời để href="#" để không reload trang */}
                                <a href="#" className="btn btn-danger w-100 my-2">
                                    <i className="fas fa-times-circle me-2"></i>Cancel Order
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    )
}
export default OrderDetails;