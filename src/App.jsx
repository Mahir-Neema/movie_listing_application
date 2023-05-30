import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import "./App.css";
import { MagnifyingGlass } from "react-loader-spinner";
import MovieListing from "./components/MovieListing";
import Favorites from "./components/Favorites";

const apikey = "b19d6809";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("avengers");
  const [favorites, setFavorites] = useState([]);
  const [theme, setTheme] = useState("dark");
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      fetchMovies();
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchTerm]);


   // Fetching movies from API using search word
  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apikey}&s=${searchTerm}`
      );
      const data = await response.json();
      setMovies(data.Search);
    } catch (error) {
      console.log("Error fetching movies:", error);
    }
  };

  // setting the new changed search term
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // adding to favorites
  const addToFavorites = (movie) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };


  // removing from favorites
  const removeFromFavorites = (imdbID) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((movie) => movie.imdbID !== imdbID)
    );
  };

  const handleThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={`App ${theme}`}>   
    <h1>Movie Listing Application</h1>

      {/* theme change button  */}
      <div className="theme-change-container">
         <button className="theme-change-button" onClick={handleThemeChange}>
           {theme === "light" ? <FaMoon /> : <FaSun />}
         </button>
      </div>

      {/* search container  */}
      <div className="search-container">
         <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>

      <div className={`tags ${theme}`}>
        <button onClick={()=>setSearchTerm('thor')} className={`tag ${theme}`}>Thor</button>
        <button onClick={()=>setSearchTerm('loki')} className={`tag ${theme}`}>Loki</button>
        <button onClick={()=>setSearchTerm('john wick')} className={`tag ${theme}`}>John Wick</button>
        <button onClick={()=>setSearchTerm('batman')} className={`tag ${theme}`}>Batman</button>
      </div>

      {/* Loader  */}
      {Loading && (
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      )}

      {/* Searched Movie List  */}
      {!Loading && <MovieListing movies={movies} addToFavorites={addToFavorites} />}

      {/* favorites movie list  */}
      <Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />
    </div>
  );
};

export default App;

