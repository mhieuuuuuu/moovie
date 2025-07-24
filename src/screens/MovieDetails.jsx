import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import ISO6391 from "iso-639-1";
import Navbar from "../components/Navbar";
import { useParams } from "react-router";
import CastList from "../components/CastList";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
countries.registerLocale(enLocale);
import { useAuth } from "../context/AuthContext";
import FavButton from "../components/FavButton";

const MovieDetails = () => {
  const { category, id } = useParams();
  const [movieData, setMovieData] = useState([]);
  const [show, setShow] = useState(false);
  const [video, setVideo] = useState([]);
  const imgUrl = "https://image.tmdb.org/t/p/w500";
  const backdropUrl = "https://image.tmdb.org/t/p/original";
  const apikey = "api_key=22348bf6f06376a691526e655159ce80";
  const baseUrl = "https://api.themoviedb.org/3";
  const [recomendationApi, setRecomendationApi] = useState(
    baseUrl + `/${category}/${id}/recommendations?` + apikey
  );
  const similarApi = baseUrl + `/${category}/${id}/similar?` + apikey;
  const { currentUser } = useAuth();

  const getColor = () => {
    if (movieData.vote_average >= 7) return "bg-rating-high";
    if (movieData.vote_average >= 4) return "bg-rating-medium";
    if (movieData.vote_average == 0) return "bg-white";
    return "bg-rating-low";
  };

  const getReleaseDate = (dateStr) => {
    if (!dateStr || typeof dateStr !== "string") return "N/A";

    const parts = dateStr.split("-");
    if (parts.length !== 3) return "Invalid date";

    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  };

  const getRunTime = (time) => {
    if (time == 0) return "";
    let h = Math.floor(time / 60);
    let m = time % 60;
    return `${h}h ${m}m`;
  };

  const getOrgCountry = (a) => {
    a.map((code, index) => {
      a[index] = countries.getName(code, "en", { select: "official" }) || code;
    });
    return a.join(" • ");
  };

  useEffect(() => {
    const getData = async (url) => {
      try {
        const response = await axios.get(url);
        console.log(response.data);
        //   console.log(response.data.results);
        setMovieData(response.data);
      } catch (error) {
        console.error(error);
        return [];
      }
    };
    getData(baseUrl + `/${category}/${id}?` + apikey);
    setRecomendationApi(
      baseUrl + `/${category}/${id}/recommendations?` + apikey
    );
    const getVideo = async (url) => {
      try {
        const response = await axios.get(url);
        console.log(response.data);
        //   console.log(response.data.results);
        setVideo(response.data.results[0]);
      } catch (error) {
        console.error(error);
        return [];
      }
    };
    getVideo(baseUrl + `/${category}/${id}/videos?` + apikey);
    window.scrollTo(0, 0);
  }, [category, id]);

  return (
    <>
      <Navbar />
      <div className="bg-background text-white pb-10">
        {movieData && (
          <>
            <div
              className="relative h-[50vh] bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${
                  backdropUrl + movieData.backdrop_path
                })`,
              }}
            >
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-background to-transparent"></div>
            </div>

            <div className="relative max-w-[1260px] mx-auto mt-[-200px] px-8 flex items-start justify-start flex-wrap lg:flex-nowrap ">
              <div className="flex-1 hidden md:block">
                <div
                  className="bg-cover bg-center bg-no-repeat rounded-xl pt-[165%]"
                  style={{
                    backgroundImage: `url(${imgUrl + movieData.poster_path})`,
                  }}
                ></div>
                <div className="flex flex-col gap-3">
                  <div className="text-white mt-10 text-xl font-bold">
                    Facts
                  </div>
                  <div className="flex flex-col gap-8">
                    {movieData.original_name ||
                      (movieData.original_title && (
                        <div className="">
                          <div className="text-white  text-[16px] font-bold">
                            Original title
                          </div>
                          <div className="text-white text-[16px]">
                            {movieData.original_name ||
                              movieData.original_title}
                          </div>
                        </div>
                      ))}

                    {movieData.status && (
                      <div className="">
                        <div className="text-white  text-[16px] font-bold">
                          Status
                        </div>
                        <div className="text-white text-[16px]">
                          {movieData.status}
                        </div>
                      </div>
                    )}

                    {movieData.type && (
                      <div className="">
                        <div className="text-white  text-[16px] font-bold">
                          Type
                        </div>
                        <div className="text-white text-[16px]">
                          {movieData.type}
                        </div>
                      </div>
                    )}
                    {movieData.original_language && (
                      <div className="">
                        <div className="text-white  text-[16px] font-bold">
                          Original language
                        </div>
                        <div className="text-white text-[16px]">
                          {movieData.original_language &&
                            ISO6391.getName(`${movieData.original_language}`)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-[70%] pl-0 md:pl-8 space-y-8">
                <div>
                  <h1 className="text-[3rem] leading-none font-bold mb-2">
                    {movieData.title || movieData.name}
                  </h1>
                  <p className="text-white">
                    {movieData.runtime &&
                      movieData.release_date &&
                      getReleaseDate(movieData.release_date) +
                        " • " +
                        getOrgCountry(movieData.origin_country) +
                        " • " +
                        getRunTime(movieData.runtime)}
                  </p>
                </div>

                {show && (
                  <div className="top-[-10%] fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
                    <div className="bg-black rounded-lg overflow-hidden shadow-lg w-[90%] max-w-2xl relative">
                      <div className="w-full text-xl font-bold p-2 pl-5 pr-5 flex justify-between items-center">
                        Play Trailer
                        <button
                          onClick={() => setShow(false)}
                          className=" text-white text-2xl font-bold hover:text-hover"
                        >
                          &times;
                        </button>
                      </div>

                      <iframe
                        className="w-full h-[300px] sm:h-[400px]"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        title="Movie Trailer"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {movieData.genres &&
                    movieData.genres.slice(0, 5).map((genre, index) => (
                      <span
                        key={index}
                        className="px-6 py-2 border-2 border-white rounded-xl text-sm font-semibold bg-white/10"
                      >
                        {genre.name}
                      </span>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={`h-[50px] w-[50px] rounded-[50%] p-[2.5px] shadow-[0.6px 0.6px 1px -0.1px rgba(0,0,0,0.15), -0.6px -0.6px 1px -0.1px rgba(255,255,255,0.7)] flex items-center justify-center ${getColor()}`}
                  >
                    <div className="h-[44px] w-[44px] rounded-[50%] flex items-center justify-center bg-black">
                      <div className="text-xl text-white font-bold">
                        {movieData.vote_average &&
                          (movieData.vote_average != 0
                            ? movieData.vote_average.toFixed(1)
                            : "NR")}
                      </div>
                    </div>
                  </div>
                  <div className="text-white text-xl font-bold">User Score</div>
                  <FavButton
                    user={currentUser}
                    media_type={category}
                    id={id}
                    name={movieData.title || movieData.name}
                    poster_path={movieData.poster_path}
                    vote_average={movieData.vote_average}
                  />
                  <button
                    onClick={() => setShow(true)}
                    className="text-white font-bold ml-10 px-4 py-2 rounded-xl border-2 border-white hover:bg-hover hover:border-hover hover:text-black transition-all duration-300 "
                  >
                    Play Trailer
                  </button>
                </div>

                <div>
                  <p className="text-subtitle mb-2 italic">
                    {movieData.tagline}
                  </p>
                  <div className="text-xl mb-2 font-bold">Overview</div>
                  <p className="tracking-wide">{movieData.overview}</p>
                </div>

                <div>
                  <CastList category={category} id={id} />
                  <Carousel title="Similar" api={similarApi} />
                  <Carousel title="Recomendations" api={recomendationApi} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MovieDetails;
