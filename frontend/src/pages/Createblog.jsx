import './Createblog.css'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
<<<<<<< HEAD
import API from "../axios/Axiosinstance";
import Editblog from './Editblog';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
=======
import './Createblog.css'

>>>>>>> 3de41b7c1a0763a28a6e4a8cf557757b8110b5c1
function Createblog() {

  const navigation = useNavigate()
  // Initial form data
  const initialValues = {
    blogtitle: "",
    blogcontent: "",
    blogthumbnailurl: null,
  };

  // Yup validation schema
  const validationSchema = Yup.object({
    blogtitle: Yup.string().required("Blog title is required"),
    blogcontent: Yup.string().required("Blog content is required"),
  });


  const sendData = async(values)=>{
    try {
       const res = await API.post('blog/blogs',values)
       const response = res.data.statusCode;
          
          console.log(response);
          
         if(response == 200){
           toast.success("Blog posted successfully!")
           navigation('/postblog') 
        }
    } catch (error) {
        const response = error.data.statusCode;
        if(response == 500){
          toast.error("Server error!")
        }
      
    }
     
  }

  // Handle form submission
  const handleSubmit = (values, { resetForm }) => {
    console.log("Form data submitted:", values);
sendData(values)
    // Reset the form fields
    resetForm();
  };

  return (
<<<<<<< HEAD
    <>
    <Navbar/>
    <section>
=======
    <div className="Createblog-page">
>>>>>>> 3de41b7c1a0763a28a6e4a8cf557757b8110b5c1
      <div className="create-blog">
        <h2>Create a New Blog</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, errors, touched }) => (
            <Form encType="multipart/form-data">
              <div className="form-group">
                <label htmlFor="title">Blog Title:</label>
                <Field
                  type="text"
                  id="blogtitle"
                  name="blogtitle"
                  placeholder="Enter your blog title"
                  className="input-field"
                />
                <ErrorMessage name="title" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="content">Blog Content:</label>
                <Field
                  as="textarea"
                  id="blogcontent"
                  name="blogcontent"
                  placeholder="Write your blog content here..."
                  className="input-field"
                />
                <ErrorMessage name="content" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="thumbnail">Blog Thumbnail:</label>
                <input
                  type="file"
                  id="blogthumbnailurl"
                  name="blogthumbnailurl"
                  onChange={(e) => setFieldValue("thumbnail", e.target.files[0])}
                  accept="image/*"
                  className="input-field"
                />
                <ErrorMessage name="thumbnail" component="div" className="error" />
              </div>

              <button type="submit">Create Blog</button>
            </Form>
          )}
        </Formik>
      </div>
<<<<<<< HEAD
    </section>
    <Footer/>
    </>
=======
    </div >
>>>>>>> 3de41b7c1a0763a28a6e4a8cf557757b8110b5c1
  );
}

export default Createblog;
