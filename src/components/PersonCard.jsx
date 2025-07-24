import React from "react";
import { Link } from "react-router";

const PersonCard = (props) => {
  const imgUrl = "https://image.tmdb.org/t/p/w500";

  const getKnownFor = (a) => {
    const titles = a.map((item) => item.title || item.name);
    return `${titles[0]}, ${titles[1]}, and ${titles[2]}`;
  };

  return (
    <div className="w-[280px] h-[395px] bg-surface rounded-xl mb-10 ">
      <Link to={`/person/${props.id}`}>
        <div className="h-[310px] overflow-hidden rounded-xl">
          <img
            src={
              props.profilePath
                ? imgUrl + props.profilePath
                : //   : "https://placehold.co/1080x1580"
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGLJfKaGbymfs6A97-1Lxqj0DXgzUnLBVBFQ&s"
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
      {props.knownFor && (
        <div className="text-subtitle text-sm pl-[15px] pr-[5px]">
          {props.knownFor && getKnownFor(props.knownFor)}
        </div>
      )}
    </div>
  );
};

export default PersonCard;
