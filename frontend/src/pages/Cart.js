import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PubicLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaMinus, FaShoppingCart, FaPlus, FaTrash } from "react-icons/fa";

const Cart = () => {
  const userId = localStorage.getItem("userId");
  const [cartItems, setCartItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    fetch(`http://127.0.0.1:8000/api/cart/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data);
        const total = data.reduce(
          (sum, item) => sum + item.food.item_price * item.quantity,
          0
        );
        setGrandTotal(total);
      });
  }, [userId, navigate]);

  const updateQuantity = async (orderId, newQty) => {
    if (newQty < 1) return;

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/cart/update_quantity/",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: orderId,
            quantity: newQty,
          }),
        }
      );

      if (response.ok) {
        const updated = await fetch(`http://127.0.0.1:8000/api/cart/${userId}`);
        const data = await updated.json();
        setCartItems(data);
        const total = data.reduce(
          (sum, item) => sum + item.food.item_price * item.quantity,0);
        setGrandTotal(total);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Lỗi khi kết nối đến máy chủ");
    }
  };

  const deleteCartItem = async (orderId) => {

    const confirmDelete = window.confirm("Are you sure you want to remove this item?");

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/cart/delete/${orderId}/`,
        {
          method: "DELETE",
          // headers: { "Content-Type": "application/json" },
          // body: JSON.stringify({
          //   orderId: orderId,
          //   quantity: newQty,
          // }),
        }
      );

      if (response.ok) {
        const updated = await fetch(`http://127.0.0.1:8000/api/cart/${userId}/`);
        const data = await updated.json();
        setCartItems(data);
        const total = data.reduce(
          (sum, item) => sum + item.food.item_price * item.quantity,0);
        setGrandTotal(total);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Lỗi khi kết nối đến máy chủ");
    }
  };

  return (
    <PublicLayout>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="container py-5">
        <h2 className="mb-4 text-center text-primary">
          <FaShoppingCart className="me-2" />
          You Cart
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-muted">Your cart is empty</p>
        ) : (
          <>
            <div className="row">
              {cartItems.map((item) => (
                <div className="col-md-6 mb-4" key={item.id}>
                  <div className="card shadow-sm">
                    <div className="row">
                      <div className="col-md-4">
                        <img
                          src={`http://127.0.0.1:8000${item.food.image}`}
                          className="img-fluid rounded-start"
                          style={{ minHeight: "200px" }}
                          alt=""
                        />
                      </div>

                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="cart-title">
                            {item.food.item_name}
                          </h5>
                          <p className="cart-text text-muted small">
                            {item.food.item_description}
                          </p>
                          <p className="fw-bold text-success">
                            {item.food.item_price} VND
                          </p>

                          <div className="d-flex align-items-center mb-2">
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              disabled={item.quantity <= 1}
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity - 1
                                )
                              }
                            >
                              <FaMinus />
                            </button>

                            <span className="fw-bold px-2">
                              {item.quantity}
                            </span>

                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity + 1
                                )
                              }
                            >
                              <FaPlus />
                            </button>
                          </div>

                          <button className="btn btn-sm btn-outline-danger px-3" onClick={() =>deleteCartItem(item.id)}>
                            <FaTrash className="me-2" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card p-4 mt-4 shadow-sm border-0">
              <h4>Total: {grandTotal.toFixed(2)} VND</h4>
              <div className="text-end">
                <button className="btn btn-primary mt-3 px-4 py-2" onClick={() =>navigate("/payment")}>
                  <FaShoppingCart className="me-2" />
                  Procced to Payment
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </PublicLayout>
  );
};

export default Cart;
