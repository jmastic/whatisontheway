import React, { Component } from 'react';
import GMap from '../../components/Map';

class Map extends Component {
  render() {
    return (
      <GMap
        mapConfig={this.props.config}
        directions={this.props.directions}
        onMapMounted={this.props.onMapMounted}
        isMarkerShown={this.props.markers && this.props.markers.length}
        markers={this.props.markers}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%`, width: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width: `100%` }} />}
        mapElement={<div style={{ height: `100%`, width: `100%` }} />}
      />
    )
  }
}

export default Map;
