import React, { Component } from 'react';
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Rectangle
} from 'react-google-maps'
import shallowCompare from 'react-addons-shallow-compare';
import RouteBoxInfoWindow from '../../components/InfoWindow';
import RouteBoxMarker from '../../components/Marker';

// This is the map renderer, to separate withGoogleMap from
// the main class
const RenderMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={props.mapConfig && props.mapConfig.initialZoom}
    defaultCenter={{
      lat: props.mapConfig && props.mapConfig.initialCenter
        && props.mapConfig.initialCenter.lat,
      lng: props.mapConfig && props.mapConfig.initialCenter
        && props.mapConfig.initialCenter.lng
    }}
    defaultOptions={
      { mapTypeControl: false }
    }
    ref={props.onMapMounted}
  >
    {
      props.directions &&
      <DirectionsRenderer directions={props.directions} />
    }
    {
      props.markers && props.markers.length
        ? props.markers.map((marker, index) => (
          <RouteBoxMarker
            position={marker.geometry.location}
            onClick={() => props.onMarkerClick(marker)}
            key={index}
          >
          {
            marker.isInfoWindowOpen &&
            <RouteBoxInfoWindow
              onCloseClick={() => props.onMarkerClick(marker)}
              marker={marker}
            />
          }
          </RouteBoxMarker>
        ))
      : ''
    }
    {
      props.drawBoxes && props.boxes && props.boxes.length
        ? props.boxes.map((box, index) => {
          return <Rectangle
            defaultBounds={box}
            draggable={false}
            editable={false}
            visible={props.drawBoxes}
            key={index}
          />
          })
        : ''
    }
  </GoogleMap>
));

// The main RouteBoxMap class
class RouteBoxMap extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    // Only re-render when our props have changed
    if (nextProps.directions !== this.props.directions) {
      return true;
    }
    if (nextProps.markers !== this.props.markers) {
      return true;
    }
    if (nextProps.drawBoxes !== this.props.drawBoxes) {
      return true;
    }
    if (nextProps.boxes !== this.props.boxes && this.props.drawBoxes) {
      return true;
    }
    return !shallowCompare(nextProps, this.props);
  }

  render() {
    return (
      <RenderMap
        { ...this.props }
      />
    )
  }
}

export default RouteBoxMap;
