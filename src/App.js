import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY; 
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

export default function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  return (
    <div className="container">
      <h1>🎬 Popular Movies</h1>
      <div className="grid">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </div>
  );
}