import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PubicLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ProfilePage = () =>
{
    const userId = localStorage.getItem("userId");
    const [formData, setFormData] = useState({
        first_name:'',
        last_name:'',
        email:'',
        mobile:'',
        password:'',
        reg_data:'',

    });
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
        navigate("/login");
        return;
        }

        fetch(`http://127.0.0.1:8000/api/user/${userId}`)
        .then((res) => res.json())
        .then((data) => {
            setFormData(data);
            
        })
    }, [userId, navigate]);

    const handleChange = (e) => {

        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit = async (e) => {
          e.preventDefault();
 
          try {
            const response = await fetch(`http://127.0.0.1:8000/api/user_update/${userId}/`, {
              method: "PUT",
              headers: {'Content-Type': 'application/json'}, 
              body: JSON.stringify({firstname:formData.first_name,lastname:formData.last_name})
    
            });
            const result = await response.json();
      
            if (response.status === 200) {
              toast.success(result.message || 'Profile Update successfully ');
              
             
            } else {
              toast.error(result.message ||'Something went wrong ');
            }
          } catch (error) {
            console.error(error);
            toast.error("Error connecting to the server");
          }
        };
    return(
    <PublicLayout>
    <ToastContainer position="top-center" autoClose={2000} />
    <div className="container py-5">
        <h3 className="text_center text-primary mb-4"><i className="fas fa-user-circle me-1"></i>My Profile</h3>
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm border-0">
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="mb-1">First Name</label>
                    <input type="text" className="form-control" name="first_name" value={formData.first_name} onChange={handleChange}></input>

                </div>

                <div className="col-md-6 mb-3">
                    <label className="mb-1">Last Name</label>
                    <input type="text" className="form-control" name="first_name" value={formData.last_name} onChange={handleChange}></input>
                </div>

                <div className="col-md-6 mb-3">
                    <label className="mb-1">email</label>
                    <input type="email" className="form-control"  value={formData.email} disabled></input>

                </div>
                <div className="col-md-6 mb-3">
                    <label className="mb-1">Mobile Number</label>
                    <input type="text" className="form-control"  value={formData.mobile}disabled ></input>

                </div>
                

                <div className="col-md-6 mb-3">
                    <label className="mb-1">Registration Date</label>
                    <input type="text" className="form-control"  value={new Date(formData.reg_data).toLocaleString()}disabled ></input>

                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3" >
                <i className="fas fa-save me-2"></i> Update Profile
            </button>
        </form>
    </div>
    </PublicLayout>
    )
}
export default ProfilePage;