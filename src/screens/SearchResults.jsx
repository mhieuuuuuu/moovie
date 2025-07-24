import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ShowList from "../components/ShowList";
import { Outlet, useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import Card from "../components/Card";

const SearchResults = () => {
  const apikey = "api_key=22348bf6f06376a691526e655159ce80";
  const baseUrl = "https://api.themoviedb.org/3";
  const [movieData, setMovieData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { category, keyword } = useParams();
  useEffect(() => {
    const getData = async (url) => {
      if (keyword === undefined) return;
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
    getData(
      baseUrl +
        `/search/${category}?` +
        apikey +
        `&query=${encodeURIComponent(keyword)}`
    );
    window.scrollTo(0, 0);
  }, [category, keyword]);

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
    <div className="w-screen h-full bg-background">
      <Navbar />
      <div className="font-bold text-2xl text-white mb-6 pl-10 mt-10">
        Search results
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
                    ? `/${category}`
                    : `/search/${category}/${encodeURIComponent(search)}`
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
                  type={category}
                />
              </div>
            ))}
          </div>
          {page < totalPage && (
            <div className=" flex items-center justify-center">
              <button
                onClick={() => {
                  loadMore(
                    baseUrl +
                      `/search/${category}?` +
                      apikey +
                      `&query=${encodeURIComponent(keyword)}`
                  );
                }}
                className="text-white font-bold px-4 py-2 rounded-xl border-2 border-white hover:bg-hover hover:border-black hover:text-black transition-all duration-300 "
              >
                Load more
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;
