import "./../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [fictional, setFictional] = useState([]);
  const [nonFictional, setNonFictional] = useState([]);
  const [search, setSearch] = useState("");

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

  // Function to filter books based on the search term
  const filterBooks = (books) => {
    return books.filter((book) => {
      const title = book.volumeInfo?.title?.toLowerCase() || "";
      const authors = book.volumeInfo?.authors?.[0]?.toLowerCase() || "";
      return (
        title.includes(search.toLowerCase()) ||
        authors.includes(search.toLowerCase())
      );
    });
  };

  // Filtered data for displaying
  const filteredFictional = filterBooks(fictional);
  const filteredNonFictional = filterBooks(nonFictional);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand text-white fw-bold" href="/">
            Page Turner's
          </a>

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

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarContent"
          >
            {/* Search Bar */}
            <form className="d-flex">
              <input
                className="form-control me-2 custom-search-input"
                type="search"
                placeholder="Search by title, author..."
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
        </div>
      </nav>

      <h3 className="heading mt-5">Fictional Books</h3>
      <div className="carousel-container">
        <div className="carousel">
          {filteredFictional.length > 0 ? (
            filteredFictional.map((book, index) => (
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
            ))
          ) : (
            <p className="book-title">No Book Found</p>
          )}
        </div>
      </div>

      <h3 className="heading">Non-Fictional Books</h3>
      <div className="carousel-container">
        <div className="carousel">
          {filteredNonFictional.length > 0 ? (
            filteredNonFictional.map((book, index) => (
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
            ))
          ) : (
            <p className="book-title">No Book Found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
