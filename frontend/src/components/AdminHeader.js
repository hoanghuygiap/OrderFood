import React,{useState} from 'react';
import {FaBars,FaBell,FaSignOutAlt} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
const AdminHeader = () => {

  const navigate = useNavigate();
  const handleLogin = () =>{
    localStorage.removeItem("adminUser");
    navigate('/admin-login');
  }
  return (
   <nav className ="navbar navbar-expand-lg navbar-light bg-white border-bottom px-3 shadow-sm">
    
    <span className = "navbar-brand fw-semibold"><i className = "fas fa-utensils me-2"></i>Food Ordering System</span>
    <button className = "navbar-toggler p-0 ms-auto" >
          <FaBars/>
    </button>

    <div className = "collapse navbar-collapse" >
      <ul className = "navbar-nav ms-auto align-items-center gap 3">
          <li className = "nav-item">
            <button className = "btn btn-outline-secondary">
                 <FaBell/>
            </button>
          </li>
          <li className = "nav-item">
            <button className = "btn btn-outline-danger ms-3" onClick = {handleLogin}>
               <FaSignOutAlt/>  LogOut
            </button>
          </li>
      </ul>
    </div>
   </nav>
  )
}   
export default AdminHeader;