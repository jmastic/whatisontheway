import React, { Component } from "react";
import { InfoWindow } from "react-google-maps";
import "./index.css";

class RouteBoxInfoWindow extends Component {
  truncate(str, len, after) {
    return str.length > len ? `${str.substring(0, len)}${after}` : str;
  }

  openingHours(hours) {
    // console.log('[InfoWindow] hours', hours);
    if (!hours) {
      return null;
    }
    return (
      <p>
        <strong className="place-inline-heading">Hours:</strong>
        {hours.open_now && <span>Open Now</span>}
        {!hours.open_now && <span>Currently Closed</span>}
      </p>
    );
  }

  printWebsite(website) {
    return (
      <p>
        <a target={"_blank"} href={website}>
          {this.truncate(website.split("?")[0], 50, "...")}
        </a>
      </p>
    );
  }

  printPhoneNumber(phoneNumber) {
    return (
      <p>
        <a href={"tel:" + phoneNumber}>{phoneNumber}</a>
      </p>
    );
  }

  printPhoto(photo) {
    if (!photo.getUrl || typeof photo.getUrl !== "function") {
      return;
    }

    return (
      <a href={this.props.marker.details.url}>
        <img
          src={photo.getUrl({
            maxWidth: 100,
            maxHeight: 100,
          })}
          alt={this.props.marker.name}
          style={{
            marginRight: "10px",
          }}
        />
      </a>
    );
  }

  render() {
    const marker = this.props.marker;
    return (
      <InfoWindow onCloseClick={this.props.onCloseClick}>
        <div>
          <p>
            <strong style={{ fontSize: "125%" }}>{marker.name}</strong>
          </p>
          <p>{marker.details.formatted_address}</p>
          <div className="place-photo">
            {marker.details.photos && marker.details.photos.length && this.printPhoto(marker.details.photos[0])}
          </div>
          <div className="place-details">
            {this.openingHours(marker.details.opening_hours)}
            {marker.details.website && this.printWebsite(marker.details.website)}
            {marker.details.formatted_phone_number && this.printPhoneNumber(marker.details.formatted_phone_number)}
          </div>
        </div>
      </InfoWindow>
    );
  }
}

export default RouteBoxInfoWindow;
