import React from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import { movieApi } from "../assets/data";
import Footer from "../components/Footer";
import { useState } from "react";
import { Link } from "react-router";
import { Search } from "lucide-react";

const Home = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="w-screen h-full bg-background relative overflow-x-hidden">
      <Navbar />
      <div className="mt-1 w-screen h-[300px] relative overflow-hidden mt-[-40px] mb-5 absolute">
        <img
          className="w-full absolute"
          src="./../../public/footer-bg.jpg"
        ></img>
        <div className="absolute w-full h-full flex flex-col items-center justify-center">
          <div className=" w-full mb-5">
            <div className="pl-[10%] text-white font-bold text-[48px]">
              Welcome to Moovie.
            </div>
            <div className="pl-[10%] text-white font-bold text-[32px]">
              Millions of movies to discover. Explore now.
            </div>
          </div>
          <div className=" mt-5 flex items-center w-[90%] bg-transparent rounded-xl ring-2 ring-white shadow-inner px-3 py-1 focus-within:ring-2 focus-within:ring-hover">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="flex-grow bg-transparent outline-none px-3 py-2 text-subtitle placeholder-subtitle "
            />
            <Link
              to={
                search === ""
                  ? `/movie`
                  : `/search/movie/${encodeURIComponent(search)}`
              }
            >
              <button className="text-white hover:text-hover transition flex items-center">
                <Search size={20} />
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="pl-10">
        <Carousel title="Today's trending movies" api={movieApi.trending} />
        <Carousel title="Today's trending TV shows" api={movieApi.TVtrending} />
        <Carousel title="What's popular" type="movie" api={movieApi.popular} />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
