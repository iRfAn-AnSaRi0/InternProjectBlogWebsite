import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import API from "../axios/Axiosinstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";


function Navbar() {
  const navigation = useNavigate()

  const sendData = async()=>{
    try {
       const res = await API.post('user/logout')
       const response = res.data.statusCode;
          console.log(response);
          
        if(response == 200){
         toast.success("Logout Successfully")
         navigation('/') 
        }
    } catch (error) {
        console.log(error);
        
       
    }
     
  }

  const handleLogout = () => {
    sendData()
  };

  return (
    <>
      <nav>
        <div className="logo">
          <Link to="/">
            <h2>BlogOasis</h2>
          </Link>
        </div>
        <div className="list">
          <ul>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <a href="#authors">Authors</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <Link to="/contribute">Contribute</Link>
            </li>
            <li>
              <a href="#">Help</a>
            </li>
          </ul>
        </div>

        <div className="btn">
          <Link to="/createblog" className="">
            Create Blog
          </Link>
             <Link to="/signup">Signup</Link>
        
        </div>
         {/* <div className="user-circle" onClick={handleLogout}>
              <FontAwesomeIcon
                icon={faUserCircle}
                size="2x"
                style={{
                  color: '#007bff',
                  borderRadius: '50%',
                  backgroundColor: '#f1f1f1',
                  padding: '3px',
                  cursor: 'pointer',
                }}
              />
            </div> */}
       
      </nav>
    </>
  );
}

export default Navbar;
