





import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom"; // Detect current page
import cinema from "../assets/cineama.jpg"

export default function SearchDisplay({
  movies = [],
  addToWatchlist,
  removeFromWatchlist,
  watchlist = [],
}) {
  const [filterType, setFilterType] = useState("all");
  const [selectedMovie, setSelectedMovie] = useState(movies[0] || null);
  const [showDetails, setShowDetails] = useState(false);
  const location = useLocation(); // Get current route
  
  const featuredMovieRef = useRef(null)



  setTimeout(() => {
    featuredMovieRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });  
  }, 100); // Slight delay to ensure state update




  useEffect(() => {
    if (movies.length > 0) {
      setSelectedMovie(movies[0]); // Update when movies change
    }
  }, [movies]);

  function handleMovieClick(movie) {
    setSelectedMovie(movie);
    setShowDetails(false);
  }

  const isInWatchlist = (movie) =>
    watchlist.some((item) => item.imdbID === movie.imdbID);

  // Filter movies based on the selected type
  const filteredMovies =
    filterType === "all"
      ? movies
      : movies.filter((movie) => movie.Type === filterType);

  return (
    <div className="search-display">
        {movies.length === 0 && <div className="cinema-cont">
            <img src={cinema} alt="a picture of a cinema" className="cinema" />
        </div>


    }
      {/* Show filter buttons only if NOT on the Watchlist page */}

      {movies.length > 0 && location.pathname !== "/watchlist" && (
        <div className="filter-buttons">
          <button onClick={() => setFilterType("all")}>All</button>
          <button onClick={() => setFilterType("movie")}>Movies</button>
          <button onClick={() => setFilterType("series")}>Series</button>
          <button onClick={() => setFilterType("episode")}>Episodes</button>
        </div>
      )}

      {selectedMovie && (
        <div className="featured-movie" ref={featuredMovieRef}>
          <img
            src={
              selectedMovie.Poster !== "N/A"
                ? selectedMovie.Poster
                : "https://via.placeholder.com/300x450"
            }
            alt={selectedMovie.Title}
          />
          <div className="featured-details">
            <h2>{selectedMovie.Title}</h2>
            <p>
              <strong>Year:</strong> {selectedMovie.Year}
            </p>
            <p>
              <strong>Director:</strong> {selectedMovie.Director || "N/A"}
            </p>
            <p>
              <strong>Actors:</strong> {selectedMovie.Actors || "N/A"}
            </p>
            <p>
              <strong>Rating:</strong> {selectedMovie.imdbRating || "N/A"}
            </p>
            {showDetails && (
              <p className="plot-width">
                <strong>Plot:</strong> {selectedMovie.Plot || "No plot available"}
              </p>
            )}
            <div className="action-buttons">
              <button onClick={() => setShowDetails(!showDetails)} className="reveal">
                {showDetails ? "Hide Details" : "Show Details"}
              </button>
              {isInWatchlist(selectedMovie) ? (
                <button
                  onClick={() => removeFromWatchlist(selectedMovie)}
                  className="remove"
                >
                  Remove from Watchlist
                </button>
              ) : (
                <button
                  onClick={() => addToWatchlist(selectedMovie)}
                  className="add"
                >
                  Add to Watchlist
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="movies-grid">
        {filteredMovies
          .filter((movie) => !selectedMovie || movie.imdbID !== selectedMovie.imdbID)
          .map((movie) => (
            <div
              key={movie.imdbID}
              className="movie-card"
              onClick={() => handleMovieClick(movie)}
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450"
                }
                alt={movie.Title}
              />
              <h3>{movie.Title}</h3>
            
              <button onClick={() => handleMovieClick(movie)}  className="view-button">View Details</button>
            </div>
          ))}
      </div>
    </div>
  );
}















