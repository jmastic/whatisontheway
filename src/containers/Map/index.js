import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Script from 'react-load-script';
import './index.css';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: null
    };
  }

  componentDidMount() {
    this.loadMap();
  }

  componentDidUnMount() {
    // google.maps.event.clearListeners(map, 'click');
  }

  loadMap() {
    const {config} = this.props;
    this.setState({
      center: config.initialCenter
    });
    this.map = this.createMap(config.initialCenter);
  }

  createMap(center) {
    const {config} = this.props;
    const mapOptions = {
      zoom: config.initialZoom,
      center: center
    }
    return new window.google.maps.Map(this.refs.mapCanvas, mapOptions);
  }

  render() {
    return (
      <div className="google-map">
        <div className="google-map-canvas" ref="mapCanvas"></div>
      </div>
    );
  }
}

export default Map;
