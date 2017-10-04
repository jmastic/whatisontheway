import React, { Component } from 'react';
import Autocomplete from '../../components/Autocomplete';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import './index.css'

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startLocation: '',
      endLocation: ''
    };
  }

  setDirections() {
    if (!this.state.startLocation ||
      !this.state.endLocation
    ) {
      return;
    }

    const startLocationGeocode = new Promise((resolve, reject) => {
      geocodeByAddress(this.state.startLocation)
        .then(results => getLatLng(results[0]))
        .then(latLng => resolve({ o: latLng }))
        .catch(error => reject(error))
    });

    const endLocationGeocode = new Promise((resolve, reject) => {
      geocodeByAddress(this.state.endLocation)
        .then(results => getLatLng(results[0]))
        .then(latLng => resolve({ d: latLng }))
        .catch(error => reject(error))
    });

    Promise.all([startLocationGeocode, endLocationGeocode])
      .then((values) => {
        const origin = values[0].o || values[1].o;
        const destination = values[0].d || values[1].d;
        this.props.setDirections(origin, destination);
      });
  }

  handleStartLocationChange = (location) => {
    this.setState({
      startLocation: location
    })
  }

  handleEndLocationChange = (location) => {
    this.setState({
      endLocation: location
    })
  }

  render() {
    return (
      <div id="Controls">
        <Autocomplete
          address={this.state.startLocation}
          onChange={this.handleStartLocationChange}
          autoFocus={true}
          type={"search"}
          onBlur={this.setDirections.bind(this)}
          placeholder={"Start Location"}
        />
        <Autocomplete
           address={this.state.endLocation}
           onChange={this.handleEndLocationChange}
           autoFocus={false}
           type={"search"}
           onBlur={this.setDirections.bind(this)}
           placeholder={"End Location"}
        />
      </div>
    )
  }
}

export default Controls;
