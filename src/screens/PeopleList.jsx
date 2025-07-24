import React from "react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import PersonCard from "../components/PersonCard";

const PeopleList = (props) => {
  const [peopleData, setPeopleData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  useEffect(() => {
    const getData = async (url) => {
      try {
        const response = await axios.get(url + `&page=${page}`);
        console.log(response.data);
        //   console.log(response.data.results);
        setPeopleData(response.data.results);
        setTotalPage(response.data.total_pages);
      } catch (error) {
        console.error(error);
        return [];
      }
    };
    getData(props.api);
    window.scrollTo(0, 0);
  }, [props.api, page]);

  const changePage = async (page) => {
    setPage(page);
  };
  return (
    <div className="w-screen h-full bg-background">
      <Navbar />
      <div className="font-bold text-2xl text-white mb-6 pl-10 mt-10">
        Popular people
      </div>
      <div className=" flex flex-wrap justify-between pr-10 pl-10 ">
        {peopleData &&
          peopleData.map((person) => (
            <div key={person.id} className="flex-shrink-0">
              <PersonCard
                profilePath={person.profile_path}
                castName={person.name}
                knownFor={person.known_for}
                id={person.id}
              />
            </div>
          ))}
      </div>
      <div className="w-screen flex justify-center items-center mb-10">
        <div className="flex gap-5 items-center">
          <button
            onClick={() => {
              page - 1 != 0 && changePage(page - 1);
            }}
            className={`text-xl ${
              page - 1 != 0
                ? "text-white cursor-pointer"
                : "text-subtitle cursor-default"
            } `}
          >
            {"<"}
          </button>
          <div className="rounded-[50%] w-[40px] h-[40px] text-white border-2 border-white flex justify-center items-center ">
            <div>{page}</div>
          </div>
          <button
            onClick={() => {
              page + 1 <= totalPage && changePage(page + 1);
            }}
            className={`text-xl ${
              page + 1 <= totalPage
                ? "text-white cursor-pointer"
                : "text-subtitle cursor-default"
            } `}
          >
            {">"}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PeopleList;
