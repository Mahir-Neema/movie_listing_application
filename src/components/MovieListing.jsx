import React from "react";

const MovieListing = ({ movies, addToFavorites }) => {
  return (
    <div className="movies-container">
      <h2 className="center">All Movies</h2>
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
  );
};

export default MovieListing;
