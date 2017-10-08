import React, { Component } from 'react';
import { Marker } from 'react-google-maps'

class RouteBoxMarker extends Component {
  render() {
    return (
      <Marker
        position={this.props.position}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </Marker>
    )
  }
}

export default RouteBoxMarker;
