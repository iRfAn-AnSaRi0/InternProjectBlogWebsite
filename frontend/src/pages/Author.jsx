import React from 'react';
import './Author.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Author() {
  return (
    <>

      <Navbar />
        <div className="author-container">
          <h1 className="author-heading">Our Authors</h1>
          <div className="author-list">
            {authors.map((author) => (
              <div className="author-card" key={author.id}>
                <img src={author.image} alt={author.name} className="author-image" />
                <h2 className="author-name">{author.name}</h2>
                <p className="author-bio">{author.bio}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1>
            Not Showing
          </h1>
        </div>

      <Footer />
    </>

  );
}

export default Author;
