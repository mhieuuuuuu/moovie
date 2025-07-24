import React from "react";
import { Link } from "react-router";

const CardCast = (props) => {
  const imgUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="w-[150px] h-[320px] rounded-xl ">
      <Link to={`/person/${props.id}`}>
        <div className="h-[200px] overflow-hidden">
          <img
            src={
              props.profilePath
                ? imgUrl + props.profilePath
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGLJfKaGbymfs6A97-1Lxqj0DXgzUnLBVBFQ&s"
            }
            alt={props.castName}
            className="w-[100%] rounded-xl cursor-pointer"
          ></img>
        </div>
      </Link>

      <Link to={`/person/${props.id}`}>
        <div className="text-white text-sm font-bold mt-3 pl-[15px] cursor-pointer hover:text-hover">
          {props.castName ? props.castName : props.castOrgName}
        </div>
      </Link>

      <div className="text-white text-sm pl-[15px]">{props.char}</div>
    </div>
  );
};

export default CardCast;
