import axios from "axios";
import { useState, useEffect, useRef } from "react";
import React from "react";
import "../assets/global.css";
import CardCast from "./CardCast";

const CastList = (props) => {
  const [casts, setCasts] = useState([]);
  const apikey = "api_key=22348bf6f06376a691526e655159ce80";
  const baseUrl = "https://api.themoviedb.org/3";
  useEffect(() => {
    const getCasts = async (url) => {
      try {
        const response = await axios.get(url);
        console.log(response.data);
        //   console.log(response.data.results);
        setCasts(response.data.cast.slice(0, 9));
      } catch (error) {
        console.error(error);
        return [];
      }
    };
    getCasts(baseUrl + `/${props.category}/${props.id}/credits?` + apikey);
  }, [props.category, props.id]);
  const sliderRef = useRef(null);
  if (casts.length != 0) {
    return (
      <>
        <div className="text-xl mb-3 font-bold">Top Billed Cast</div>
        <div className="flex flex-col relative">
          <div
            ref={sliderRef}
            className="h-[320px] flex gap-5 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth pr-10 custom-scrollbar mb-10"
          >
            {casts.map((cast) => (
              <div key={casts.id} className="flex-shrink-0">
                <CardCast
                  profilePath={cast.profile_path}
                  castOrgName={cast.original_name}
                  castName={cast.name}
                  id={cast.id}
                  char={cast.character}
                  //   type={casts.media_type ? casts.media_type : props.type}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
};

export default CastList;
