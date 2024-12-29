import React from "react";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
<<<<<<< HEAD
import { toast } from 'react-toastify';

import API from "../axios/Axiosinstance";
import { useNavigate } from "react-router-dom";
=======
// import ForgetPassword from "../pages/ForgetPassword"
import './Login.css';
>>>>>>> 3de41b7c1a0763a28a6e4a8cf557757b8110b5c1

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
<<<<<<< HEAD

   const navigation = useNavigate()


=======
>>>>>>> 3de41b7c1a0763a28a6e4a8cf557757b8110b5c1
  // Form validation
  const {
    register: loginField,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema), // Integrate yup with react-hook-form
  });

<<<<<<< HEAD
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
=======
  const onSubmit = (data) => {
    console.log(data);
>>>>>>> 3de41b7c1a0763a28a6e4a8cf557757b8110b5c1
    // After submit, reset the form fields
    reset();
  };

  return (
    <>
      <div className="login-page">
        <div className="login-section">
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <h1 className="form-title">Login</h1>
            <div className="form-group">
              <input
                type="email"
                {...loginField("email")}
                placeholder="Enter your e-mail"
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
            <div className="form-group">
              <input
                type="password"
                {...loginField("password")}
                placeholder="Enter your password"
              />
              {errors.password && <p className="error">{errors.password.message}</p>}
            </div>
            <button className="login-btn">Login</button>
            <Link to="/ForgetPassword" className="forgot-link">Forget Password</Link>
            <p className="switch-login">
              Don’t have an account? <Link to="/signup">Create Account</Link>
            </p>
          </form>
        </div>
      </div>

    </>
  );
}

export default Login;
