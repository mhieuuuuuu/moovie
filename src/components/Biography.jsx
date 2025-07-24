import { useState } from "react";

const Biography = ({ text }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="text-white relative">
      <div
        className={`whitespace-pre-line overflow-hidden transition-all duration-300 ${
          expanded ? "max-h-full" : `max-h-[120px]`
          // expanded ? "line-clamp-none" : `line-clamp-${maxLines}`
        }`}
      >
        {text || "No biography available."}
      </div>
      {!expanded && text && text.split(" ").length > 30 && (
        <div className="absolute bottom-[1rem] left-0 w-full h-12 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      )}
      {text && text.split(" ").length > 30 && (
        <div className="flex justify-end">
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 text-white hover:text-hover font-medium transition"
          >
            {expanded ? "Show less ▲" : "Show more ▼"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Biography;
