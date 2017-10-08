import { compose, lifecycle } from "recompose";
import React from 'react';
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Rectangle,
  InfoWindow
} from 'react-google-maps'
import RouteBoxMarker from '../../components/Marker';

const GMap = compose(
  withGoogleMap,
  lifecycle({
    componentDidUpdate() {
      if (!this.props.directions ||
        !this.props.directions.origin ||
        !this.props.directions.destination
      ) {
        return;
      }
      const google = window.google;
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route({
        origin: new google.maps.LatLng(this.props.directions.origin.lat, this.props.directions.origin.lng),
        destination: new google.maps.LatLng(this.props.directions.destination.lat, this.props.directions.destination.lng),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            geoCodeDirections: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={props.mapConfig && props.mapConfig.initialZoom}
    defaultCenter={{
      lat: props.mapConfig && props.mapConfig.initialCenter
        && props.mapConfig.initialCenter.lat,
      lng: props.mapConfig && props.mapConfig.initialCenter
        && props.mapConfig.initialCenter.lng
    }}
    ref={props.onMapMounted}
  >
    {props.geoCodeDirections && <DirectionsRenderer directions={props.geoCodeDirections} />}
    {props.markers && props.markers.length && props.markers.map((place, index) => {
      return <RouteBoxMarker
        position={place.geometry.location}
        onClick={() => props.onMarkerClick(place)}
        key={index}
      >
        {place.isInfoWindowOpen && <InfoWindow onCloseClick={() => props.onMarkerClick(place)}>
          <div>
            <p><strong>{place.name}</strong></p>
            <p>{place.details.formatted_address}</p>
          </div>
        </InfoWindow>}
      </RouteBoxMarker>
    })}
    {window.boxes && window.boxes.map((box, index) => {
      return <Rectangle
        defaultBounds={box}
        draggable={false}
        editable={false}
        visible={props.drawBoxes}
        key={index}
      />
    })}
  </GoogleMap>
);

export default GMap;
