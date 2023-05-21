import React, { useState, useEffect } from 'react';
import { FaMoon,FaSun } from "react-icons/fa";
import './App.css';

const apikey = 'b19d6809'; 

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('avengers');
  const [favorites, setFavorites] = useState([]);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMovies();
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apikey}&s=${searchTerm}`
      );
      const data = await response.json();
      setMovies(data.Search);
    } catch (error) {
      console.log('Error fetching movies:', error);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addToFavorites = (movie) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };

  const removeFromFavorites = (imdbID) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((movie) => movie.imdbID !== imdbID)
    );
  };

  const handleThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`App ${theme}`}>
      <h1>Movie Listing Application</h1>

      <div className="theme-change-container">
        <button className="theme-change-button" onClick={handleThemeChange}>
          {theme === 'light' ? <FaMoon/>:<FaSun/>}
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>

      <div className="movies-container">
        <h2 className='center'>All Movies</h2>
        {movies &&
          movies.map((movie) => (
            <div key={movie.imdbID} className="movie-item">
              <button className="star" onClick={() => addToFavorites(movie)}>
                ⭐
              </button>
              <img src={movie.Poster} alt={movie.Title} />
              <div>
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
            </div>
          ))}
      </div>

      <div className="favorites-container">
        <h2 className='center'>Favorites</h2>
        
        {favorites.map((movie) => (
          <div key={movie.imdbID} className="movie-item">
            <img src={movie.Poster} alt={movie.Title} />
            <div>
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <button onClick={() => removeFromFavorites(movie.imdbID)}>
                Remove from Favorites
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
