import React from "react";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import Card from "./Card";
import { Link } from "react-router";

const ShowList = (props) => {
  const [movieData, setMovieData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  useEffect(() => {
    const getData = async (url) => {
      try {
        const response = await axios.get(url);
        console.log(response.data);
        //   console.log(response.data.results);
        setMovieData(response.data.results);
        setTotalPage(response.data.total_pages);
      } catch (error) {
        console.error(error);
        return [];
      }
    };
    getData(props.api);
    window.scrollTo(0, 0);
  }, [props.api]);

  const loadMore = async (url) => {
    try {
      const response = await axios.get(url + `&page=${page + 1}`);
      console.log(response.data);
      //   console.log(response.data.results);
      setMovieData([...movieData, ...response.data.results]);
      setPage(page + 1);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return (
    <>
      <div className="font-bold text-2xl text-white mb-6 pl-10 mt-10">
        {props.title}
      </div>
      <div className="flex items-stretch mb-10">
        <div className="w-[28%]  pl-10">
          <div className="bg-[url('./../../public/footer-bg.jpg')] w-full h-full rounded-xl flex flex-col items-center">
            <div className="mt-5 flex items-center max-w-md w-[90%] bg-transparent rounded-xl ring-2 ring-white shadow-inner px-3 py-1 focus-within:ring-2 focus-within:ring-hover">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="flex-grow bg-transparent outline-none px-3 py-2 text-subtitle placeholder-subtitle"
              />
              <Link
                to={
                  search === ""
                    ? `/${props.type}`
                    : `/search/${props.type}/${encodeURIComponent(search)}`
                }
              >
                <button className="text-white hover:text-hover transition flex items-center">
                  <Search size={20} />
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-[70%] flex flex-col">
          <div className=" flex flex-wrap pl-10 gap-5">
            {movieData.map((movie) => (
              <div key={movie.id} className="flex-shrink-0">
                <Card
                  posterPath={movie.poster_path}
                  movieTitle={movie.title}
                  movieName={movie.name}
                  voteAverage={movie.vote_average}
                  id={movie.id}
                  type={props.type}
                />
              </div>
            ))}
          </div>
          {page < totalPage && (
            <div className=" flex items-center justify-center">
              <button
                onClick={() => {
                  loadMore(props.api);
                }}
                className="text-white font-bold px-4 py-2 rounded-xl border-2 border-white hover:bg-hover hover:border-black hover:text-black transition-all duration-300 "
              >
                Load more
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShowList;
