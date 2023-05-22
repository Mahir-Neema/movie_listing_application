import React from "react";

const Favorites = ({ favorites, removeFromFavorites }) => {
  return (
    <div className="favorites-container">
      <h2 className="center">Favorites</h2>
      {favorites.map((movie) => (
        <div key={movie.imdbID} className="movie-item">
          <button
            className="star"
            onClick={() => removeFromFavorites(movie.imdbID)}
          >
            ⛔
          </button>
          <img src={movie.Poster} alt={movie.Title} />
          <div>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
