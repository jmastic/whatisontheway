import React, { Component } from 'react';
import Map from '../Map';
import Controls from '../Controls';
import PropTypes from 'prop-types';
import Script from 'react-load-script';
import searchRouteBox from '../../utils/searchRouteBox';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      googleApiLoaded: false
    };
  }

  static get propTypes() {
    return {
      config: PropTypes.shape({
        initialCenter: PropTypes.objectOf(PropTypes.number),
        initialZoom: PropTypes.number
      })
    }
  }

  get mapSettings() {
    return {
      initialCenter: {
        lat: 39.7392,
        lng: -104.9903
      },
      initialZoom: 10,
    }
  }

  handleKeyPress(event) {
    if (event.keyCode === 190 && event.shiftKey) {
      this.setState({
        drawBoxes: !!!this.state.drawBoxes
      })
    }
  }

  handleScriptCreate() {
    this.setState({
      googleApiLoaded: false
    });
  }

  handleScriptError() {
    this.setState({
      googleApiError: true
    });
  }

  handleScriptLoad() {
    this.setState({
      googleApiLoaded: true
    });
  }

  onMapMounted(mapRef) {
    this.mapRef = mapRef;
    window.map = this.mapRef;
  }

  // Given an origin and a destination, build the
  // directions service to pass to the Google map
  setDirections(origin, destination) {
    this.setState({
      directions: {
        origin: origin,
        destination: destination
      }
    })

    searchRouteBox(origin, destination, this.mapRef)
      .then((places) => {
        this.setState({
          markers: places,
          showMarkers: places && places.length > 0
        })
      });
  }

  render() {
    let content;
    if (this.state.googleApiLoaded) {
      content = <div className="full-size" onKeyDown={this.handleKeyPress.bind(this)}>
        <Controls
          setDirections={this.setDirections.bind(this)}
        />
        <Map
          directions={this.state.directions}
          markers={this.state.markers}
          drawBoxes={this.state.drawBoxes}
          config={this.mapSettings}
          onMapMounted={this.onMapMounted.bind(this)}
        />
      </div>;
    } else {
      content = <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`}
        onCreate={this.handleScriptCreate.bind(this)}
        onError={this.handleScriptError.bind(this)}
        onLoad={this.handleScriptLoad.bind(this)}
      />;
    }

    return (
      <div className="full-size">
        {content}
      </div>
    )
  }
}

export default App;