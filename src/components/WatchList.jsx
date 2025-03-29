




import React from "react";
import { Link } from "react-router-dom";

export default function WatchList({ watchlist, removeFromWatchlist }) {
  return (
    <div className="watchlist-page">
      <h2 className="watchlist-text">My Watchlist</h2>

      {watchlist.length > 0 ? (
        <div className="movies-grid">
          {watchlist.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450"
                }
                alt={movie.Title}
              />
              <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
                <button
                  onClick={() => removeFromWatchlist(movie)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-watchlist">
          <p>Your watchlist is empty</p>
          <Link to="/" className="search-link">
            Search for movies to add
          </Link>
        </div>
      )}
    </div>
  );
}

























