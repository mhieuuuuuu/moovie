import React from "react";
import { Link } from "react-router";

const CareerList = ({ credits, title }) => {
  const sortedCredits = [...credits].sort((a, b) => {
    const dateA = a.release_date || a.first_air_date || "0000";
    const dateB = b.release_date || b.first_air_date || "0000";
    return dateB.localeCompare(dateA);
  });

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="bg-surface p-4 rounded shadow text-white">
        <div className="flex flex-col gap-4">
          {sortedCredits.map((item, index) => {
            const title = item.title || item.name;
            const date = item.release_date || item.first_air_date || "";
            const year = date ? date.slice(0, 4) : "—";
            const role = item.character || item.job;

            return (
              <div key={index} className="border-b pb-3">
                <div className="flex gap-3 items-start">
                  <div className="w-[40px] font-medium flex items-center justify-center">
                    <div>{year}</div>
                  </div>
                  <div>
                    <div className="font-semibold hover:text-hover">
                      <Link to={`/${item.media_type}/${item.id}`}>{title}</Link>
                    </div>
                    <div className="flex gap-1">
                      {item.episode_count && (
                        <div className="text-sm text-subtitle">
                          {item.episode_count} episode
                          {item.episode_count > 1 ? "s" : ""}
                        </div>
                      )}
                      <div className="text-sm text-subtitle italic flex gap-1">
                        as
                        <div className="text-white">{role || "—"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CareerList;
