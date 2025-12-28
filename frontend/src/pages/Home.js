import React from "react";
import { FaUser, FaSignInAlt, FaUtensils, FaHome, FaTruck, FaUserPlus, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";
import PublicLayout  from '../components/PubicLayout'
import '../styles/home.css'
const Home = () => {
  return (
    <PublicLayout>
     <section className = "hero py-5 text-center" style = {{backgroundImage:"url('/images/food2.jpg') "}}>
        <div style = {{backgroundColor: "rgba(0,0,0,0.5)",padding: "40px 20px",borderRadius: "10px"}}>
      
        <h1 className = "disphay-4">Quick & Hot Food, Delivered to You</h1>
        <p className = "lead">Craving something tasty? Let' s get it to your door</p>

        <form method = "GET" action = "/search" className= "d-flex mt-3" style = {{maxWidth: '600px',margin: '0 '}}>
            <input type= "text" name = "q" placeholder="I would like to eat..." className = 'form-control'
             style = {{borderTopRightRadius:0,borderBottomRightRadius:0}}/>
            <button className ="btn btn-warning px-4"
            style = {{borderTopLeftRadius:0,borderBottomLeftRadius:0}}>Seach</button>
        </form>
        </div>
     </section>
    </PublicLayout>
  )
};

export default Home;
