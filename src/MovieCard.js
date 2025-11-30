import React from "react";

export default function MovieCard({ movie, imageBase }) {
  return (
    <div className="card">
      <img
        className="poster"
        src={movie.poster_path ? (imageBase + movie.poster_path) : "https://via.placeholder.com/500x750?text=No+Image"}
        alt={movie.title}
      />
      <div className="card-body">
        <div style={{fontWeight:700}}>{movie.title}</div>
        <div style={{fontSize:12, color:"#666"}}>{movie.release_date}</div>
        <div className="vote">{movie.vote_average}</div>
      </div>
    </div>
  );
}
