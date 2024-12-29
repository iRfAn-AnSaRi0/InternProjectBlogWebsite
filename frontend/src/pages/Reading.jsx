import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import API from "../axios/Axiosinstance";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa"; // Importing the bin icon
import "./Reading.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Reading() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await API.get(`/blog/blogs/${id}`);
        setBlogs(response.data.data.blog);
        setLoading(false);
        console.log(response.data.data);
      } catch (error) {
        setLoading(false);
        toast.error("Failed to load the blog!");
      }
    };

    fetchBlog();
  }, [id]);

  useEffect(() => {
    const fetchBlogcomment = async () => {
      try {
        const response = await API.get(`/blog/blogallcommets/${id}`);
        setComments(response.data.data.blog.blogcomment);
        setLoading(false);
        console.log(response.data.data.blog.blogcomment);
      } catch (error) {
        setLoading(false);
        toast.error("Failed to load the blog comments!");
      }
    };

    fetchBlogcomment();
  }, [id]);

  const initialValues = {
    comment: ""
  };

  const validationSchema = Yup.object({
    comment: Yup.string().required("Blog title is required")
  });

  const sendComment = async (values) => {
    try {
      console.log(values);
      const response = await API.post(`/blog/blogcomment/${id}`, values);
      if (response.status === 200) {
        console.log(response.data);
        toast.success("Comment posted successfully!");
      }
    } catch (error) {
      toast.error("Failed to post the comment!");
    }
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form data submitted:", values);
    sendComment(values);
    resetForm();
  };

  // Handle like button click
  const handleLike = async () => {
    try {
      const response = await API.post(`/blog/bloglike/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error("Error updating like status:", error);
      setIsLiked((prev) => !prev);
    }
  };

  // Handle comment deletion
  const deleteComment = async (commentId) => {
     try {
       const response = await API.delete(`/blog/blogcomment/${commentId}` , {data :{blogId: id }});
       if (response.status === 200) {
         setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
         toast.success("Comment deleted successfully!");
       }
     } catch (error) {
       toast.error("Failed to delete the comment!");
     }
    alert(commentId)
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Navbar/>
      <section>
        <div className="reading-page">
          <div className="title">
            <h1>{blogs.blogtitle}</h1>
          </div>
          <div className="author-date">
            <span>
              by <span>{blogs.blogauthor.username}</span>
            </span>
            <span>{new Date(blogs.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="blog-content">
            <p>{blogs.blogcontent}</p>
            <div className="comment-like">
              <a href="#comment">Comment</a>
              <button
                onClick={handleLike}
                style={{
                  backgroundColor: isLiked ? "red" : "gray",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  cursor: "pointer",
                }}
              >
                {isLiked ? "Liked" : "Like"}
              </button>
            </div>
          </div>

          <div className="reviews">
            <p>Comments:</p>
            {comments.map((comment, index) => (
              <div key={index} className="comment-item">
                <h4>{comment.user.username}</h4>
                <p>{comment.comment}</p>
                <button
                  onClick={() => deleteComment(comment._id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "red",
                    padding: "5px"
                  }}
                >
                  <FaTrashAlt /> {/* Bin icon */}
                </button>
              </div>
            ))}
          </div>

          <div className="comment-box" id="comment">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, errors, touched }) => (
                <Form encType="multipart/form-data">
                  <div className="form-group">
                    <label htmlFor="comment">Write a Comment:</label>
                    <Field
                      as="textarea"
                      id="comment"
                      name="comment"
                      placeholder="Write your comment here..."
                      className="input-field"
                    />
                    <ErrorMessage
                      name="comment"
                      component="div"
                      className="error"
                    />
                  </div>
                  <button type="submit">Send</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}

export default Reading;
