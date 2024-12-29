import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./Hero.css";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <>
      <section>
        <div className="hero-section">
          <h1>
            Write to inspire, read to grow, and create to leave your mark.
          </h1>
          <h6>Over 1000 inspiring blogs to explore!</h6>
          <input
            type="text"
            placeholder="Search for blogs, topics, or authors..."
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
          <div className="link">
            <a href="#">Tech</a>
            <a href="#">LifeStyle</a>
            <a href="#">Travel</a>
            <a href="#">Health</a>
          </div>
        </div>
      </section>

      <section>
        <div className="featured-section">
          <h1>Featured Blogs</h1>
          <div className="blog-cards">
            {/* minimum 6 card in 1 row 3 cards */}
            <div className="card">
              {/* <img src="" alt="" />
              <h1>Blog Thumbnail</h1> */}
              <div className="blog-details">
                <h1>Tech Blog</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
                  iusto molestiae debitis ullam suscipit aperiam impedit
                  reprehenderit error! Qui, inventore.
                </p>
                <a href="#">Read</a>
                <div className="authorame">
                  <span>Author</span>
                  <span>Date</span>
                </div>
              </div>
            </div>
          </div>
          <Link
            to="/blog"
            style={{
              textDecoration: "none",
              marginTop: ".5rem",
              color: " white",
              backgroundColor: " #fbbf24",
              padding: ".5rem .7rem",
              border: "1px solid",
              margin: "0 .5rem",
              borderRadius: "5px",
            }}
          >
            View More
          </Link>
        </div>
      </section>

      <section>
        <div className="tag-section">
          <h1>Tags Section</h1>
          <div className="tag-cards">
            {/* minimum 4 card in 1 row */}
            <div className="tag">
              <img
                src="https://ardentit.com.sg/wp-content/uploads/2022/03/IT-Technology.jpg"
                alt=""
              />
              <h3>Technology</h3>
            </div>
            <div className="tag">
              <img
                src="https://durefoods.com/wp-content/uploads/2018/03/lifestyle-products.jpg"
                alt=""
              />
              <h3>Lifestyle</h3>
            </div>
            <div className="tag">
              <img
                src="https://img.freepik.com/premium-photo/world-globe-with-plane-words-international-travel-bottom_1253888-4590.jpg"
                alt=""
              />
              <h3>Travel</h3>
            </div>
            <div className="tag">
              <img
                src="https://mycityhospital.pk/wp-content/uploads/2024/01/shutterstock_1561815367.jpg"
                alt=""
              />
              <h3>Health</h3>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="about-section" id="about">
          <h1>Why Choose BlogOasis?</h1>
          <p>
            Welcome to BlogOasis – your go-to platform for discovering and
            sharing captivating blogs. Whether you're passionate about Tech,
            Health, Travel, or Lifestyle, BlogOasis offers a rich variety of
            content, including global blogs, to keep you informed and inspired.
            Our advanced search feature allows you to easily find blogs on
            specific topics or by popular authors, making it simple to navigate
            through a vast range of content. Not only can you read, but you can
            also create and publish your own blogs with ease. BlogOasis provides
            detailed guidance on how to craft and post your content properly,
            ensuring it reaches the right audience. Each blog post comes with
            author details, so you can connect with writers and explore more of
            their work. Join the BlogOasis community today, where you can learn,
            share, and grow through engaging blog posts from around the world.
          </p>
          <a href="#">Join Now</a>
        </div>
      </section>

      <section>
        <div className="call-section">
          <a href="#">Share Your Story with the World</a>
        </div>
      </section>

      <section>
        <div className="author-section" id="authors">
          <h1>Meet Our Creators</h1>
          <div className="author-cards">
            {/* card slider */}
            <div className="author">
              <h1>Author image</h1>
              <div className="author-details">
                <h1>John Techman</h1>
                <p>
                  John dives into the latest advancements in Artificial
                  Intelligence, exploring its potential impact on industries,
                  daily life, and the future of technology.
                </p>
                <a href="#">Blog Link</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="community-section">
          <h1>Join the Conversation Online</h1>
          <div className="icon-cards">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faFacebook} className="icon" />
              <br />
              Facebook
            </a>
            <a
              href="https://www.instagram.com/sumitravi.in"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} className="icon" />
              <br />
              Instagram
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faLinkedin} className="icon" />
              <br />
              LinkedIn
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faTwitter} className="icon" />
              <br />
              Twitter
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
