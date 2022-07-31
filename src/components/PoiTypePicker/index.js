import React, { useState } from "react";
import * as Constants from "../../constants";
import "./index.css";

function PoiTypePicker({ setPoiType }) {
  const [activePoiType, setActivePoiType] = useState(null);

  const handlePoiTypeChange = (poiType) => {
    setActivePoiType(poiType);
    setPoiType(poiType);
  };

  const convertToString = (type) => {
    if (!type) {
      return "";
    }
    type = type.replace(/_/g, " ");
    return type.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
    <div className="place-list">
      {Constants.SUPPORTED_PLACE_TYPES.map((type, index) => {
        return (
          <div onClick={() => handlePoiTypeChange(type)} key={index} className={activePoiType === type ? "active" : ""}>
            {convertToString(type)}
          </div>
        );
      })}
    </div>
  );
}

export default PoiTypePicker;
