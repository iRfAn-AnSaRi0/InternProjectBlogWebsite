import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router and Routes correctly
import Signup from "./pages/Signup";
import Createblog from "./pages/Createblog";
import Blog from "./pages/Blog";
import Contribute from "./pages/Contribute";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Editblog from "./pages/Editblog";
import Postblog from "./pages/Postblog";
import Reading from "./pages/Reading";
// Other imports for your components

function App() {
  // const [blogs, setBlogs] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // const clientId = "77338431350-2npvna4sd2blh0ug0d4bvql83f1hjjk9.apps.googleusercontent.com";  // Replace with your actual Client ID
  // const apiKey = "YOUR_API_KEY";  // Replace with your actual API Key
  // const blogId = "YOUR_BLOG_ID";  // Replace with your Blogger Blog ID

  // // Fetch blogs from Blogger API
  // const fetchBlogs = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`
  //     );
  //     setBlogs(response.data.items);
  //     setLoading(false);
  //   } catch (err) {
  //     setError("Failed to fetch blogs");
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchBlogs();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }
  return (
    <>
        <Router>
          {" "}
          {/* Only one Router component here */}
          <ToastContainer />
          <Routes>
            {" "}
            {/* Define your routes here */}
            <Route path="/" element={<Home />} />{" "}
            {/* Correct spelling for "element" */}
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/createblog"
              element={
                  <Createblog />
              }
            />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/postblog" element={<Postblog />} />
            <Route path="/editblog/:id" element={<Editblog />} />
            <Route path="/reading/:id" element={<Reading />} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
