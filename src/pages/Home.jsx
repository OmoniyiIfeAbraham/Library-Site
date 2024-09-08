import "./../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [fictional, setFictional] = useState([]);
  const [nonFictional, setNonFictional] = useState([]);
  const [fictionIndex, setFictionIndex] = useState(0);
  const [nonFictionIndex, setNonFictionIndex] = useState(0);

  let config = {
    headers: { "content-type": "multipart/form-data" },
  };

  const fetchFictionalData = () => {
    let url =
      "https://www.googleapis.com/books/v1/volumes?q=fiction&key=AIzaSyAhtPq5ETX-NnyQ8_LfhBVzjx6jpoW_b0c&maxResults=40";

    axios
      .get(url, config)
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
      "https://www.googleapis.com/books/v1/volumes?q=non-fiction&key=AIzaSyAhtPq5ETX-NnyQ8_LfhBVzjx6jpoW_b0c&maxResults=40";

    axios
      .get(url, config)
      .then((result) => {
        if (result.data.items && result.data.items.length > 0) {
          console.log(result.data.items[0]);
          setNonFictional(result.data.items);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleFictionPrev = () => {
    setFictionIndex((prevIndex) =>
      prevIndex === 0 ? fictional.length - 6 : prevIndex - 1
    );
  };

  const handleFictionNext = () => {
    setFictionIndex((prevIndex) =>
      prevIndex === fictional.length - 6 ? 0 : prevIndex + 1
    );
  };

  const handleNonFictionPrev = () => {
    setNonFictionIndex((prevIndex) =>
      prevIndex === 0 ? nonFictional.length - 6 : prevIndex - 1
    );
  };

  const handleNonFictionNext = () => {
    setNonFictionIndex((prevIndex) =>
      prevIndex === nonFictional.length - 6 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    fetchFictionalData();
    fetchNonFictionalData();
  }, []);

  return (
    <div className="app-container">
      <h3 className="heading">Fictional Books</h3>
      <div className="carousel-container">
        <button className="carousel-button left" onClick={handleFictionPrev}>
          &#10094;
        </button>
        <div className="carousel">
          <div
            className="carousel-inner"
            style={{ transform: `translateX(-${(fictionIndex * 100) / 6}%)` }}
          >
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
                    <p className="book-title">{book.volumeInfo.title}</p>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <button className="carousel-button right" onClick={handleFictionNext}>
          &#10095;
        </button>
      </div>

      <h3 className="heading">Non-Fictional Books</h3>
      <div className="carousel-container">
        <button className="carousel-button left" onClick={handleNonFictionPrev}>
          &#10094;
        </button>
        <div className="carousel">
          <div
            className="carousel-inner"
            style={{
              transform: `translateX(-${(nonFictionIndex * 100) / 6}%)`,
            }}
          >
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
                    <p className="book-title">{book.volumeInfo.title}</p>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <button
          className="carousel-button right"
          onClick={handleNonFictionNext}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
}

export default Home;
