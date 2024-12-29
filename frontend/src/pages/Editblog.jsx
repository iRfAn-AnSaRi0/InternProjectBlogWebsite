import './Editblog.css';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import API from "../axios/Axiosinstance"; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Updateblog() {
  const { id } = useParams(); // Get the blogId from the URL parameters
  const navigation = useNavigate();
  const [blogData, setBlogData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Yup validation schema
  const validationSchema = Yup.object({
    blogtitle: Yup.string().required("Blog title is required"),
    blogcontent: Yup.string().required("Blog content is required"),
  });

  // Fetch blog data by id 
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await API.get(`/blog/blogs/${id}`);
        setBlogData(response.data.data.blog); 
        setLoading(false);
      } catch (error) {
        setError("Error fetching blog data");
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id]);

  // Handle form submission (simulate update)
  const handleSubmit = async (values, { resetForm }) => {
    try {
      await API.put(`/blog/blogs/${id}`, values);
      
      toast.success("Blog updated successfully!");
      navigation('/postblog');
      resetForm();
    } catch (error) {
      toast.error("Failed to update the blog.");
    }
  };

  // If blogData is not yet loaded, show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <Navbar/>
    <section>
      <div className="update-blog">
        <h2>Update Blog</h2>

        <Formik
          initialValues={{
            blogtitle: blogData.blogtitle || "",
            blogcontent: blogData.blogcontent || "",
            blogthumbnailurl: blogData.blogthumbnailurl || null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, errors, touched }) => (
            <Form encType="multipart/form-data">
              <div className="form-group">
                <label htmlFor="blogtitle">Blog Title:</label>
                <Field
                  type="text"
                  id="blogtitle"
                  name="blogtitle"
                  placeholder="Enter your blog title"
                  className="input-field"
                />
                <ErrorMessage name="blogtitle" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="blogcontent">Blog Content:</label>
                <Field
                  as="textarea"
                  id="blogcontent"
                  name="blogcontent"
                  placeholder="Write your blog content here..."
                  className="input-field"
                />
                <ErrorMessage name="blogcontent" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="blogthumbnailurl">Blog Thumbnail:</label>
                <input
                  type="file"
                  id="blogthumbnailurl"
                  name="blogthumbnailurl"
                  onChange={(e) => setFieldValue("blogthumbnailurl", e.target.files[0])}
                  accept="image/*"
                  className="input-field"
                />
                <ErrorMessage name="blogthumbnailurl" component="div" className="error" />
              </div>

              <button type="submit">Update Blog</button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
    <Footer/>
    </>
  );
}

export default Updateblog;
