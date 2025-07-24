import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Card from "./Card";
import "../assets/global.css";

const KnownForList = (props) => {
  //URL
  // const apikey = "api_key=22348bf6f06376a691526e655159ce80";
  // const baseUrl = "https://api.themoviedb.org/3";
  // const trendingUrl = baseUrl + "/trending/all/day?" + apikey;
  // const popular_url = base_url + "/movie/popular?" + apikey;
  // const top_rated_url = base_url + "/movie/top_rated?" + apikey;
  // const search_url = base_url + "/search/movie?" + apikey;
  // const img_url = "https://image.tmdb.org/t/p/w500";

  //API
  const [movieData, setMovieData] = useState([]);
  useEffect(() => {
    const getData = async (url) => {
      try {
        const response = await axios.get(url);
        console.log(response.data);
        //   console.log(response.data.results);
        setMovieData(response.data.cast.slice(0, 9));
      } catch (error) {
        console.error(error);
        return [];
      }
    };
    getData(props.api);
  }, [props.api]);

  const sliderRef = useRef(null);

  return (
    <div className="flex flex-col relative">
      <div className="font-bold text-2xl text-white mb-5">{props.title}</div>
      <div
        ref={sliderRef}
        className="h-[350px] flex gap-5 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth pr-10 custom-scrollbar mb-10"
      >
        {movieData.map((movie) => (
          <div key={movie.id} className="flex-shrink-0">
            <Card
              posterPath={movie.poster_path}
              movieTitle={movie.title}
              movieName={movie.name}
              voteAverage={movie.vote_average}
              id={movie.id}
              type={movie.media_type ? movie.media_type : props.type}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnownForList;
