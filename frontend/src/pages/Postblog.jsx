import React, { useState, useEffect } from "react";
import './Postblog.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";
import API from "../axios/Axiosinstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Postblog() {
  const navigation = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(""); 

  const userId = "676e284305d8e78aba8bc80a"; // Example user ID

  
  const handleDelete = async (id) => {
    try {
      const res = await API.delete(`blog/blogs/${id}`);
      console.log(res.data);
      toast.success(res.data.message);
      
      
      setBlogs((prevBlogs) => {
        const updatedBlogs = prevBlogs.filter((blog) => blog._id !== id);
        
       
        if (updatedBlogs.length === 0) {
          setMessage("No Blog Found");
        }

        return updatedBlogs;
      });
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  // Handle the edit button click
  const handleEdit = (id) => {
    navigation(`/editblog/${id}`);
  };

  useEffect(() => {
    const sendData = async () => {
      try {
        // Fetch blogs from the API
        const res = await API.get(`blog/${userId}/blogs`);
        console.log(res.data);

        if (res.data && res.data.data && res.data.data.blogs && res.data.data.blogs.length > 0) {
          setBlogs(res.data.data.blogs); 
          setMessage(""); 
        } else {
          setBlogs([]); 
          setMessage(res.data.data.message); 
        }
        setLoading(false); 
      } catch (error) {
        setLoading(false);
        setMessage("Error fetching blogs");
        console.error("Error fetching blogs", error);
      }
    };

    sendData(); 
  }, []); 
  if (loading) {
    return <p>Loading blogs...</p>; 
  }

  return (
    <>
    <Navbar/>
    <section className="post-blog">
      {message ? (
        <p>{message}</p> 
      ) : (
        blogs.map((blog) => (
          <div key={blog._id}>
            <div className="post-header">
              <h2>{blog.blogtitle}</h2>
              <div className="post-actions">
                <button onClick={() => handleEdit(blog._id)}>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button onClick={() => handleDelete(blog._id)}>
                  <FontAwesomeIcon icon={faTrashAlt} /> Delete
                </button>
              </div>
            </div>

            <div className="post-body">
              <p>{blog.blogcontent}</p>
            </div>

            <div className="post-footer">
              <div className="post-likes">
                <FontAwesomeIcon icon={faThumbsUp} /><span>{blog.bloglike.length}</span>
              </div>
              <div className="post-comments">
                <FontAwesomeIcon icon={faComment} /><span>{blog.blogcomment.length}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </section>
    <Footer/>
    </>
  );
}

export default Postblog;
