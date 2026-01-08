import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";
const AdminDashboard = () => {
  const adminUser = localStorage.getItem("adminUser");
  const Navigate = useNavigate();
  const [metrics, setMetrices] = useState({
    total_orders: 0,
    new_orders: 0,
    confirmed_orders: 0,
    food_prepering: 0,
    food_pickup: 0,
    food_delivered: 0,
    cancelled_orders: 0,
    total_users: 0,
    total_categories: 0,
    today_sales: 0,
    week_sales: 0,
    month_sales: 0,
    year_sales: 0,
    total_reviews: 0,
    today_wishlists: 0,
  });
  const cardData = [
    {
      title: "Total Orders",
      key: "total_orders",
      color: "primary",
      icon: "fas fa-shopping-cart",
    },
    {
      title: "New Orders",
      key: "new_orders",
      color: "secondary",
      icon: "fas fa-cart-plus",
    },
    {
      title: "Confirmed Orders",
      key: "confirmed_orders",
      color: "info",
      icon: "fas fa-check-circle",
    },
    {
      title: "Food Being Prepared",
      key: "food_prepering",
      color: "warning",
      icon: "fas fa-utensils",
    },
    {
      title: "Food Pickup",
      key: "food_pickup",
      color: "dark",
      icon: "fas fa-motorcycle",
    },
    {
      title: "Food Delivered",
      key: "food_delivered",
      color: "success",
      icon: "fas fa-truck",
    },
    {
      title: "Cancelled Orders",
      key: "cancelled_orders",
      color: "danger",
      icon: "fas fa-times-circle",
    },
    {
      title: "Total Users",
      key: "total_users",
      color: "primary",
      icon: "fas fa-users",
    },
    {
      title: "Today's Sales",
      key: "today_sales",
      color: "info",
      icon: "fas fa-coins",
    },
    {
      title: "This Week's Sales",
      key: "week_sales",
      color: "secondary",
      icon: "fas fa-calendar-week",
    },
    {
      title: "This Month's Sales",
      key: "month_sales",
      color: "dark",
      icon: "fas fa-calendar-alt",
    },
    {
      title: "This Year's Sales",
      key: "year_sales",
      color: "success",
      icon: "fas fa-calendar",
    },
    {
      title: "Total Categories",
      key: "total_categories",
      color: "warning",
      icon: "fas fa-list-alt",
    },
    {
      title: "Total Reviews",
      key: "total_reviews",
      color: "primary",
      icon: "fas fa-star",
    },
    {
      title: "Total Wishlists",
      key: "total_wishlists",
      color: "secondary",
      icon: "fas fa-heart",
    },
  ];

  useEffect(() => {
    if (!adminUser) {
      Navigate("/admin-login");
      return;
    }
  }, [adminUser, Navigate]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dashboard_metrics/")
      .then((res) => res.json())
      .then((data) => {
        setMetrices(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  return (
    <AdminLayout>
      <div className="row g-3">
        {cardData.map((item, i) => {
          const value = metrics[item.key];
          const isCurrency = item.key.includes("sales"); // kiểm tra nếu là doanh thu

          return (
            <div className="col-md-3" key={i}>
              <div className={`card card-hover bg-${item.color} text-white`}>
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="card-title">{item.title}</h5>
                    <h2>
                      {isCurrency
                        ? value.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })
                        : value}
                    </h2>
                  </div>
                  <i className={`${item.icon} fa-2x`}></i>
                </div>
              </div>
            </div>
          );
        })}

        <div className="col-md-3">
          <div className="card bg-light text-white d-flex flex-column justify-content-center align-items-center p-3">
            <i className="fas fa-concierge-bell fa-2x text-danger mb-3"></i>
            <p className="text-dark fw-bold text-center">
              Food Ordering
              <br />
              <span className="text-danger">System</span>
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
