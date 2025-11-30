import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function App(){
  const [movies,setMovies] = useState([]);
  const [q,setQ] = useState("");
  const [loading,setLoading] = useState(false);

  async function fetchPopular(){
    setLoading(true);
    try{
      const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
      const json = await res.json();
      setMovies(json.results || []);
    }catch(e){
      console.error(e);
      setMovies([]);
    }finally{
      setLoading(false);
    }
  }

  async function searchMovies(term){
    if(!term) return fetchPopular();
    setLoading(true);
    try{
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(term)}&page=1`);
      const json = await res.json();
      setMovies(json.results || []);
    }catch(e){
      console.error(e);
      setMovies([]);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{ fetchPopular(); }, []);

  return (
    <div className="app">
      <div className="header">
        <div className="title">Movie DB — Simple</div>
        <div>
          <input className="search" placeholder="Search movies..." value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') searchMovies(q); }} />
          <button style={{marginLeft:8}} onClick={()=>searchMovies(q)}>Search</button>
        </div>
      </div>

      {loading ? <div>Loading</div> : (
        <div className="grid">
          {movies.length === 0 && <div>No results</div>}
          {movies.map(m=> <MovieCard key={m.id} movie={m} imageBase={IMAGE_BASE} />)}
        </div>
      )}
    </div>
  );
}
