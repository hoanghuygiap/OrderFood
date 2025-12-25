import React from "react";
import { FaUser, FaSignInAlt, FaUtensils, FaHome, FaTruck, FaUserPlus, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg">
      <div className="container">
        <Link className="navbar-brand" href="#"><FaUtensils className = "me-1"/>Food Ordering System</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"><span className="navbar-toggler-icon"></span></button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link active" to="#"><FaHome className = "me-1"/>Home</Link></li>
            <li className="nav-item mx-1"><Link className="nav-link" to= "#"><FaUtensils className = "me-1"/>Menu</Link></li>
            <li className="nav-item mx-1"><Link className="nav-link" to= "#"><FaTruck className = "me-1"/>Track</Link></li>
            <li className="nav-item mx-1"><Link className="nav-link" to= "#"><FaUserPlus className = "me-1"/>Register</Link></li>
                        <li className="nav-item mx-1"><Link className="nav-link" to= "#"><FaSignInAlt className = "me-1"/>Login</Link></li>
            <li className="nav-item mx-1"><Link className="nav-link" to= "#"><FaUserShield className = "me-1"/>Admin</Link></li>
            
          </ul>

        </div>
      </div>
    </nav>
  );
};

export default Home;
