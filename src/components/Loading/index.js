import React from "react";
import image from "./puff.svg";
import "./index.css";

// Loading SVG from https://github.com/SamHerbert/SVG-Loaders
function Loading() {
  return (
    <div className="loading full-size">
      <div className="loading-container">
        <img src={image} alt={"Loading"} />
      </div>
    </div>
  );
}

export default Loading;
