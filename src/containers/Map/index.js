import React, { Component } from 'react';
import GMap from '../../components/Map';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInfoWindowOpen: false
    }
  }

  onMarkerClick(place) {
    if (place.isInfoWindowOpen) {
      place.isInfoWindowOpen = false;
      this.setState({
        isInfoWindowOpen: !!!this.state.isInfoWindowOpen
      });
      return;
    }

    if (place.details) {
      place.isInfoWindowOpen = true;
      this.setState({
        isInfoWindowOpen: !!!this.state.isInfoWindowOpen
      });
      return;
    }

    const placeRequest = {
      reference: place.reference
    };
    const map = window.map.context[Object.keys(window.map.context)[0]]
    const service = new window.google.maps.places.PlacesService(map);
		service.getDetails(placeRequest, (details, status) => {
      if (details) {
        place.isInfoWindowOpen = true;
        place.details = details;
        this.setState({
          isInfoWindowOpen: !!!this.state.isInfoWindowOpen
        });
        return;
      }
      console.log('details were returned', details);
    });
  }

  render() {
    return (
      <GMap
        mapConfig={this.props.config}
        directions={this.props.directions}
        onMapMounted={this.props.onMapMounted}
        isMarkerShown={this.props.markers && this.props.markers.length}
        markers={this.props.markers}
        onMarkerClick={this.onMarkerClick.bind(this)}
        drawBoxes={this.props.drawBoxes}
        isInfoWindowOpen={this.state.isInfoWindowOpen}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%`, width: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width: `100%` }} />}
        mapElement={<div style={{ height: `100%`, width: `100%` }} />}
      />
    )
  }
}

export default Map;
