import React, { Component } from "react";
import * as Constants from "../../constants";
import "./index.css";

class PoiTypePicker extends Component {
  convertToString(type) {
    if (!type) {
      return "";
    }
    type = type.replace(/_/g, " ");
    return type.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  render() {
    return (
      <div>
        <div className="place-list">
          {Constants.SUPPORTED_PLACE_TYPES.map((type, index) => {
            return (
              <div
                onClick={() => this.props.onTypeChange(type)}
                key={index}
                className={this.props.activeType === type ? "active" : ""}
              >
                {this.convertToString(type)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default PoiTypePicker;
