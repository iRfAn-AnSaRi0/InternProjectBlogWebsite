import React from "react";
import './Login.css'
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from 'react-toastify';

import API from "../axios/Axiosinstance";
import { useNavigate } from "react-router-dom";

// Define the Yup validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must contain a valid domain (e.g., .com, .org)"
    )
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[@$!%*?&]/, "Password must contain at least one special character")
    .required("Password is required"),
});

function Login() {

   const navigation = useNavigate()


  // Form validation
  const {
    register: loginField,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema), // Integrate yup with react-hook-form
  });

  const sendData = async(data)=>{
    try {
       const res = await API.post('user/login',data)
       const response = res.data.statusCode;
          
        if(response == 200){
          toast.success("Login Successfully")
         navigation('/') 
         
        }
    } catch (error) {
         const responsecode = error.response.data.statusCode;
         const response = error.response.data.error[0];
              if(responsecode == 400){
                toast.error(response)
              }
        console.log(error);
        
       
    }
     
  }

  const onSubmit = (data) => {

    sendData(data);
    // After submit, reset the form fields
    reset();
  };

  return (
    <>
      <div className="login-section">
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <h1>Login</h1>
          <div className="form-group">
            <input
              type="email"
              {...loginField("email")}
              placeholder="Email"
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              {...loginField("password")}
              placeholder="Password"
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>
          <a href="/forgot-password">Forgot Password?</a>
          <button className="login-btn">Login</button>
          <p className="switch-login">
            Don’t have an account? <Link to="/signup">Create Account</Link>
          </p>
          <p className="forgot-password">
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
