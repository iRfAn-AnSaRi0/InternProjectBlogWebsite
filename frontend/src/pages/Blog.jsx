import { useState, useEffect } from "react";
import "./Blog.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../axios/Axiosinstance";
import { useNavigate } from "react-router-dom";

function Blog() {
  const navigation = useNavigate();
  const [language, setLanguage] = useState("en");
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    console.log(`Selected Language: ${selectedLanguage}`);
  };

  useEffect(() => {
    const sendData = async () => {
      try {
        const res = await API.get(`blog/blogs`);
        console.log(res.data.data.blogs);
        setBlogs(res.data.data.blogs)
        setLoading(false); 
      } catch (error) {
        setLoading(false);
        console.error("Error fetching blogs", error);
      }
    };

    sendData(); 
  }, []);


 const handleReading = (id)=>{
  alert(id);
  
     navigation(`/reading/${id}`)
 }


  if (loading) {
    return <p>Loading blogs...</p>; // Show loading message while fetching data
  }

  return (
    <>
    <Navbar />
      <section>
        <div className="blog-section-head">
          <div className="filter-section">
            <a href="#">All</a>
            <a href="#">Tech</a>
            <a href="#">Travel</a>
            <a href="#">Health</a>
            <a href="#">Lifestyle</a>
          </div>
          <select
            id="language"
            value={language}
            onChange={handleLanguageChange}
            className="language-dropdown"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="zh">中文</option>
          </select>
        </div>
      </section>

      <section>
        <div className="blog-section-body">
             {blogs.map((blog, index)=>
              
              <div className="blog" key={index} onClick={()=>handleReading(blog._id)}>
              {/* <div className="blog-thumbnail"></div> */}
              <div className="blog-overviews">
                <h3>{blog.blogtitle}</h3>
                <p>
                  {blog.blogcontent}
                </p>
                <span>
                  by <span>{blog.blogauthor.username}</span>
                </span>
                <div className="comments-likes">
                  <span>
                    comment <span>{blog.blogcomment.length}</span>
                  </span>
                  <span>
                    Like <span>{blog.bloglike.length}</span>
                  </span>
                </div>
                
              </div>
            
            </div>
             )}
          
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Blog;
