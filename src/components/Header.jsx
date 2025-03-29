



import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";  

export default function Header({ setMovies }) {
  const apiKey = import.meta.env.VITE_API_KEY

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`
      );
      const data = await response.json();

      if (data.Search) {
        // Fetch full details for each movie
        const detailedMovies = await Promise.all(
          data.Search.map(async (movie) => {
            const detailsResponse = await fetch(
              `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`
            );
            return detailsResponse.json();
          })
        );
        setMovies(detailedMovies);
      } else {
        setMovies([]); 
      }
        setSearchTerm("");

    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <section className="header">
      <div className="header-top">
        <h1 className="logo">Movie Verse</h1>

        <nav className="nav-links">
          <Link to="/" className="large-screen-link">Home</Link>
          <Link to="/watchlist" className="large-screen-link">Watchlist</Link>

        </nav>
        <FontAwesomeIcon
          icon={menuOpen ? faTimes : faBars}
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>

      {/* mobile navigation */}
      <nav className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        <FontAwesomeIcon
          icon={faTimes}
          className="close-icon"
          onClick={() => setMenuOpen(false)}
        
        />
        <Link to="/" onClick={() => setMenuOpen(false)} className="mobile-link-text">Home</Link>
        <Link to="/watchlist" onClick={() => setMenuOpen(false)} className="mobile-link-text">Watchlist</Link>
      </nav>

      <div className="search-container">
        <div className="input-icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="magnifyer" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search here"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
        </div>
        
        <button className="btn-search" onClick={handleSearch}>
          Search
        </button>
      </div>
    </section>
  );
}



