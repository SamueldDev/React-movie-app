



import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import SearchDisplay from "./components/SearchDisplay";
import WatchList from "./components/WatchList";
import "./App.css";

export default function App() {
    const [watchlist, setWatchlist] = useState([]);
    const [movies, setMovies] = useState([]);

    function addToWatchlist(movie) {
        if (!watchlist.find(item => item.imdbID === movie.imdbID)) {
            setWatchlist([...watchlist, movie]);
        }
    }

    function removeFromWatchlist(movie) {
        setWatchlist(watchlist.filter(item => item.imdbID !== movie.imdbID));
    }

    return (

        <Router>
            <div className="container">
            <Header setMovies={setMovies} />
            
            <Routes>
                <Route path="/" element={
                    <SearchDisplay 
                        movies={movies} 
                        addToWatchlist={addToWatchlist} 
                        removeFromWatchlist={removeFromWatchlist} 
                        watchlist={watchlist} 
                        setMovies={setMovies}
                    />
                } />
                <Route path="/watchlist" element={
                    <WatchList 
                        watchlist={watchlist} 
                        removeFromWatchlist={removeFromWatchlist} 
                    />
                } />
            </Routes>
            </div>
          
        </Router>
    );
}