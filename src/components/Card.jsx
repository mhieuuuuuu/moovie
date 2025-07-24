import React from "react";
import { Link } from "react-router";

const Card = (props) => {
  const imgUrl = "https://image.tmdb.org/t/p/w500";
  const getColor = () => {
    if (props.voteAverage >= 7) return "bg-rating-high";
    if (props.voteAverage >= 4) return "bg-rating-medium";
    if (props.voteAverage == 0) return "bg-white";
    return "bg-rating-low";
  };
  const link = `/${props.type}/${props.id}`;

  return (
    <div className="w-[150px] h-[350px] rounded-xl overflow-hidden relative ">
      <Link to={link}>
        <img
          src={
            props.posterPath
              ? imgUrl + props.posterPath
              : "https://placehold.co/1080x1580"
          }
          alt={props.movieName}
          className="w-[100%] h-[225px] rounded-xl cursor-pointer "
        ></img>
      </Link>

      <div className="h-[40px] w-[40px] absolute top-[205px] left-[15px]">
        <div
          className={`h-[40px] w-[40px] rounded-[50%] p-[2.5px] shadow-[0.6px 0.6px 1px -0.1px rgba(0,0,0,0.15), -0.6px -0.6px 1px -0.1px rgba(255,255,255,0.7)] flex items-center justify-center ${getColor()}`}
        >
          <div className="h-[34px] w-[34px] top-[64%] rounded-[50%] flex items-center justify-center bg-black">
            <div className="text-xs text-white">
              {props.voteAverage ? props.voteAverage.toFixed(1) : "NR"}
            </div>
          </div>
        </div>
      </div>

      <Link to={link}>
        <div className="text-white text-sm font-bold mt-7 pl-[15px] cursor-pointer hover:text-hover">
          {props.movieName ? props.movieName : props.movieTitle}
        </div>
      </Link>
    </div>
  );
};

export default Card;
