import React, { useState } from "react";
import "../styles/admin.css";
import { Link } from "react-router-dom";
import {
  FaThLarge,
  FaUsers,
  FaEdit,
  FaChevronUp,
  FaChevronDown,
  FaList,
  FaFile,
  FaSearch,
  FaComment,
  FaCommentAlt,
} from "react-icons/fa";

const AdminSideBar = () => {
  const [openMenu, setOpenMenu] = useState({
    category: false,
    food: false,
    orders: false,
  });

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <div className="bg-dark text-white sidebar">
      {/* Header */}
      <div className="text-center p-3 border-bottom">
        <img
          src="/images/admin-icon.jpg"
          className="img-fluid rounded-circle mb-2"
          alt="Admin"
          style={{ width: "80px", height: "80px" }}
        />
        <h6 className="mb-0">Admin</h6>
      </div>

      {/* Dashboard */}
      <div className="list-group list-group-flush mt-3">
        <Link
          to="/admin/dashboard"
          className="list-group-item list-group-item-action bg-dark text-white border-0"
        >
          <FaThLarge className="me-2" />
          Dashboard
        </Link>

        {/* Users */}
        <Link
          to="/admin/users"
          className="list-group-item list-group-item-action bg-dark text-white border-0"
        >
          <FaUsers className="me-2" />
          Reg Users
        </Link>

        {/* Food Category */}
        <button
          className="list-group-item list-group-item-action bg-dark text-white border-0 text-start"
          onClick={() => toggleMenu("category")}
        >
          <FaEdit className="me-2" />
          Food Category{" "}
          {openMenu.category ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {openMenu.category && (
          <div className="ps-4">
            <Link
              to="/add-category"
              className="list-group-item list-group-item-action bg-dark text-white border-0"
            >
              Add Category
            </Link>
            <Link
              to="/manage-category"
              className="list-group-item list-group-item-action bg-dark text-white border-0"
            >
              Manage Category
            </Link>
          </div>
        )}

        {/* Food Item */}
        <button
          className="list-group-item list-group-item-action bg-dark text-white border-0"
          onClick={() => toggleMenu("food")}
        >
          <FaEdit className="me-2" />
          Food Item {openMenu.food ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {openMenu.food && (
          <div className="ps-4">
            <Link
              to="/add-food"
              className="list-group-item list-group-item-action bg-dark text-white border-0"
            >
              Add Food Item
            </Link>
            <Link
              to="/manage-food"
              className="list-group-item list-group-item-action bg-dark text-white border-0"
            >
              Manage Food Item
            </Link>
          </div>
        )}

        <button
          className="list-group-item list-group-item-action bg-dark text-white border-0 text-start"
          onClick={() => toggleMenu("orders")}
        >
          <FaList className="me-2" />
          Orders {openMenu.orders ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {openMenu.orders && (
          <div className="ps-4">
            <Link
              to="/admin/category/add"
              className="list-group-item list-group-item-action bg-dark text-white border-0"
            >
              Not Confirmed
            </Link>
            <Link
              to="/admin/category/manage"
              className="list-group-item list-group-item-action bg-dark text-white border-0"
            >
              Confirmed
            </Link>
            <Link
              to="/admin/category/manage"
              className="list-group-item list-group-item-action bg-dark text-white border-0"
            >
              Beging Prepared
            </Link>
            <Link
              to="/admin/category/manage"
              className="list-group-item list-group-item-action bg-dark text-white border-0"
            >
              Food Pickup
            </Link>

            <Link
              to="/admin/category/manage"
              className="list-group-item list-group-item-action bg-dark text-white border-0"
            >
              Delivered
            </Link>

            <Link
              to="/admin/category/manage"
              className="list-group-item list-group-item-action bg-dark text-white border-0"
            >
              All Orders
            </Link>
          </div>
        )}

        <Link
          to="/admin/search"
          className="list-group-item list-group-item-action bg-dark text-white border-0"
        >
          <FaFile className="me-2" /> B/W Dates Report
        </Link>

        {/* Search */}
        <Link
          to="/admin/search"
          className="list-group-item list-group-item-action bg-dark text-white border-0"
        >
          <FaSearch className="me-2" />
          Search
        </Link>

        {/* Reviews */}
        <Link
          to="/admin/reviews"
          className="list-group-item list-group-item-action bg-dark text-white border-0"
        >
          <FaCommentAlt className="me-2" />
          Manage Reviews
        </Link>
      </div>
    </div>
  );
};

export default AdminSideBar;
