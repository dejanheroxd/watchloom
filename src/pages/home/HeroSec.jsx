import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../context/movie-context";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  AddressBook,
  ArrowLeft,
  ArrowRight,
  CaretRight,
  Clipboard,
  Star,
  VideoCamera,
} from "phosphor-react";

function HeroSec() {
  const { popularMovies, API_IMG, API_DETAILS, API_KEY, genreNames } =
    useContext(MovieContext);

  const [movieDetails, setMovieDetails] = useState([]);
  const [credits, setCredits] = useState([]);

  console.log(movieDetails);

  useEffect(() => {
    // Fetch movie details and credits for each movie
    popularMovies.forEach((movie) => {
      // Fetch movie details
      fetch(API_DETAILS + movie.id + "?api_key=" + API_KEY)
        .then((res) => res.json())
        .then((data) =>
          setMovieDetails((prevDetails) => [...prevDetails, data])
        );

      // Fetch credits
      fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => setCredits((prevCredits) => [...prevCredits, data]));
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
    <div className="h-screen overflow-hidden">
      <div>
        <Swiper
          slidesPerView={1}
          loop={true}
          grabCursor={true}
          className="mySwiper"
        >
          {popularMovies.map((movie, index) => (
            <SwiperSlide key={movie.id}>
              <div>
                <img
                  className="h-screen w-screen object-cover"
                  src={API_IMG + movie.backdrop_path}
                  alt=""
                />
                <div className="h-full w-full bg-black/40 absolute top-0 left-0 right-0"></div>
              </div>
              <div className="absolute flex justify-center flex-col items-center top-[34%] bottom-[25%] left-[18%] right-[18%] z-30 text-white">
                <div className="w-full pl-24">
                  <p className="font-bold text-9xl">
                    {movie.title.toUpperCase()}
                  </p>
                  <button className="bg-black/60 backdrop-blur-sm text-white px-16 py-[58px] absolute bottom-12 right-72 rounded-full">
                    <div className="flex flex-col">
                      <span>BUY</span>
                      <span>NOW</span>
                    </div>
                  </button>
                </div>
                <div className="w-full flex pt-12 gap-x-2 pl-24 font-semibold">
                  <p className="border border-white/50 rounded-xl px-5 py-2">
                    {genreNames[movie.genre_ids[0]]}
                  </p>
                  <p className="border border-white/50 rounded-xl px-5 py-2">
                    {trimDate(movie.release_date)}
                  </p>
                  <p className="border border-white/50 rounded-xl px-5 py-2">
                    {formatDuration(movieDetails[index]?.runtime)}
                  </p>
                </div>
              </div>
              <div className="px-14 flex absolute justify-between w-full bottom-[-8px]">
                <div className="flex gap-x-2 items-center">
                  <div className=" pb-[45px]">
                    <div className="text-white font-semibold pb-5">
                      <div className="flex items-center gap-x-1">
                        <div className="bg-white px-[7px] py-[7px] rounded-full">
                          <Clipboard size={14} color="black" weight="fill" />
                        </div>
                        <p>Votes</p>
                      </div>
                    </div>
                    <button className="w-28 py-3 border text-white border-white/50 rounded-lg">
                      <p>{movieDetails[index]?.vote_count}</p>
                    </button>
                  </div>
                  <div className=" pb-[45px]">
                    <div className="text-white font-semibold pb-5">
                      <div className="flex items-center gap-x-1">
                        <div className="bg-white px-[7px] py-[7px] rounded-full">
                          <Star size={14} weight="fill" color="black" />
                        </div>
                        <p>Rating</p>
                      </div>
                    </div>
                    <button className="w-28 py-3 border text-white border-white/50 rounded-lg">
                      <p>{Math.floor(movieDetails[index]?.vote_average)}</p>
                    </button>
                  </div>
                  <div className="pl-36 flex flex-col pb-14">
                    <div className="mb-6 border-white/30-red-300 gap-x-1 h-8 flex items-center">
                      <button className="h-7 w-7 flex items-center justify-center bg-white rounded-full">
                        <VideoCamera size={14} weight="fill" />
                      </button>
                      <p className="font-semibold text-white">Trailer</p>
                    </div>
                    <div className="border-white/50 w-60 h-14 rounded-full overflow-hidden relative">
                      <img
                        src={API_IMG + movie.backdrop_path}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <button className="bg-white px-[18px] py-[18px] z-30 top-0 rounded-full absolute right-0">
                        <CaretRight weight="fill" size={20} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center mb-14 mr-60">
                  <div className="flex gap-x-1">
                    <button className="h-7 w-7 flex items-center justify-center bg-white rounded-full">
                      <AddressBook size={17} weight="fill" />
                    </button>
                    <p className="font-semibold text-white">Main Actors</p>
                  </div>
                  <div className="flex pt-3 mt-4 ml-[-5px] overflow-hidden h-[68px] w-48 gap-x-3">
                    {credits[index] &&
                      credits[index].cast
                        .slice(0, 3)
                        .map((castMember, castIndex) => (
                          <img
                            key={castIndex}
                            src={
                              castMember.profile_path
                                ? `https://image.tmdb.org/t/p/w185/${castMember.profile_path}`
                                : "path_to_default_image.jpg"
                            }
                            alt={castMember.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        ))}
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <button className="w-28 py-3 text-black bg-white border border-white/50 rounded-lg">
                    Buy movie
                  </button>
                  <button className="w-28 py-3 text-white border rounded-lg">
                    scroll
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default HeroSec;
