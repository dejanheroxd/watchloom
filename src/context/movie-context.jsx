import { createContext, useEffect, useState } from "react";

export const MovieContext = createContext(null);

export default function MovieContextProvider(props) {
  const [popularMovies, setPopularMovies] = useState([]);
  const [genreNames, setGenreNames] = useState([]);

  const API_KEY = "0e1faa6879be5de85f3101533144604d";

  const API_URL_POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

  const API_IMG = "https://image.tmdb.org/t/p/original/";

  const API_DETAILS = "https://api.themoviedb.org/3/movie/";

  const API_GENRE = "https://api.themoviedb.org/3/genre/movie/list?api_key=";

  useEffect(() => {
    fetch(API_URL_POPULAR)
      .then((res) => res.json())
      .then((data) => setPopularMovies(data.results));
  }, [API_URL_POPULAR]);

  useEffect(() => {
    fetch(API_GENRE + API_KEY)
      .then((res) => res.json())
      .then((data) => {
        const genreMap = {};
        data.genres.forEach((genre) => {
          genreMap[genre.id] = genre.name;
        });
        setGenreNames(genreMap);
      });
  }, [API_KEY, API_GENRE]);

  const contextValue = {
    popularMovies,
    API_IMG,
    API_DETAILS,
    API_KEY,
    genreNames,
  };

  return (
    <MovieContext.Provider value={contextValue}>
      {props.children}
    </MovieContext.Provider>
  );
}
