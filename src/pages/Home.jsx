import "./../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [fictional, setFictional] = useState([]);
  const [nonFictional, setNonFictional] = useState([]);

  const fetchFictionalData = () => {
    let url =
      "https://www.googleapis.com/books/v1/volumes?q=fiction&maxResults=40";
    axios
      .get(url)
      .then((result) => {
        if (result.data.items && result.data.items.length > 0) {
          setFictional(result.data.items);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchNonFictionalData = () => {
    let url =
      "https://www.googleapis.com/books/v1/volumes?q=non-fiction&maxResults=40";
    axios
      .get(url)
      .then((result) => {
        if (result.data.items && result.data.items.length > 0) {
          setNonFictional(result.data.items);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchFictionalData();
    fetchNonFictionalData();
  }, []);

  return (
    <div className="app-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {/* Navbar Title */}
          <a className="navbar-brand" href="#">
            Page Turner's
          </a>

          {/* Navbar Toggler for Mobile View */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Content */}
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarContent"
          >
            {/* Search Bar */}
            <form className="d-flex">
              <input
                className="form-control me-2 custom-search-input"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </div>
        </div>
      </nav>

      <h3 className="heading">Fictional Books</h3>
      <div className="carousel-container">
        <div className="carousel">
          {fictional.map((book, index) => (
            <div className="book-card" key={index}>
              <Link to={`/book/${book.id}`} className="custom-link">
                {book.volumeInfo && book.volumeInfo.imageLinks ? (
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                    className="book-image"
                  />
                ) : (
                  <img
                    src="./../../assests/default.jpg"
                    alt="Default"
                    className="book-image"
                  />
                )}
                {book.volumeInfo && (
                  <p className="book-title">
                    {book.volumeInfo.title.slice(0, 30)}
                  </p>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <h3 className="heading">Non-Fictional Books</h3>
      <div className="carousel-container">
        <div className="carousel">
          {nonFictional.map((book, index) => (
            <div className="book-card" key={index}>
              <Link to={`/book/${book.id}`} className="custom-link">
                {book.volumeInfo && book.volumeInfo.imageLinks ? (
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                    className="book-image"
                  />
                ) : (
                  <img
                    src="./../../assests/default.jpg"
                    alt="Default"
                    className="book-image"
                  />
                )}
                {book.volumeInfo && (
                  <p className="book-title">
                    {book.volumeInfo.title.slice(0, 30)}
                  </p>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
