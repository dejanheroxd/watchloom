import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../context/movie-context";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function HeroSec() {
  const { popularMovies, API_IMG, API_DETAILS, API_KEY, genreNames } =
    useContext(MovieContext);

  const [movieDetails, setMovieDetails] = useState([]);

  useEffect(() => {
    popularMovies.forEach((movie) => {
      fetch(API_DETAILS + movie.id + "?api_key=" + API_KEY)
        .then((res) => res.json())
        .then((data) =>
          setMovieDetails((prevDetails) => [...prevDetails, data])
        );
    });
  }, [API_KEY, popularMovies, API_DETAILS]);

  function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedDuration = `${hours}h ${remainingMinutes}m`;
    return formattedDuration;
  }

  function trimDate(date) {
    const year = date.substring(0, 4);
    return year;
  }

  return (
    <div className="border-red-500 border h-screen overflow-hidden">
      <div>
        <Swiper
          slidesPerView={1}
          loop={true}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper "
        >
          {popularMovies.map((movie, index) => (
            <SwiperSlide key={movie.id}>
              <div>
                <img
                  className="h-screen w-screen object-cover"
                  src={API_IMG + movie.backdrop_path}
                  alt=""
                />
              </div>
              <div className="absolute top-10 z-30">
                <div>{movie.title}</div>
                <p>{formatDuration(movieDetails[index]?.runtime)}</p>
                <p>{trimDate(movie.release_date)}</p>
                <p>{genreNames[movie.genre_ids[0]]}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default HeroSec;
