import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import './Contribute.css'

function Contribute() {
  return (
    <>
      <Navbar />

      <div className="category-filters">
        <button onClick={() => filterContributors('design')}>Designers</button>
        <button onClick={() => filterContributors('content')}>Content Creators</button>
        <button onClick={() => filterContributors('dev')}>Developers</button>
      </div>


      <div className="contribution-page">

        <section className="contribution-grid">
          <div className="contributor-card">
            <img src="path_to_image" alt="Contributor Name" className="profile-img" />
            <h3>Contributor Name</h3>
            <p>Role: Blog Writer</p>
            <a href="https://github.com/contributor" target="_blank">View Profile</a>
            <div className="testimonial">
              <p>"Contributing to this project was an amazing experience. It helped me improve my skills and meet great people!"</p>
              <h4>- Contributor Name</h4>
            </div>
          </div>
        </section>



        <div className="contribution-grid">
          <section className="contributor-card">
            <img src="path_to_image" alt="Contributor Name" className="profile-img" />
            <h3>Contributor Name</h3>
            <p>Role: Blog Writer</p>
            <a href="https://github.com/contributor" target="_blank">View Profile</a>

            <div className="testimonial">
              <p>"Contributing to this project was an amazing experience. It helped me improve my skills and meet great people!"</p>
              <h4>- Contributor Name</h4>
            </div>
          </section>
        </div>
      </div>


      <Footer />
    </>
  );
}


export default Contribute