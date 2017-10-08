import React, { Component } from 'react';
import Autocomplete from '../../components/Autocomplete';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import './index.css'

class Controls extends Component {
  constructor(props) {
    super(props);
    // Default state for the controls. Should have
    // start + end locations, and the type of place to look for
    this.state = {
      startLocation: '18342 E Saskatoon Pl, Parker, CO, United States',
      endLocation: 'Park Meadows Drive, Lone Tree, CO, United States',
      poiType: 'pet_store'
    };
  }

  // Geocode an address (string).
  geocodeAddress(address) {
    return new Promise((resolve, reject) => {
      if (!address) {
        return reject('Address not provided');
      }

      geocodeByAddress(address)
        .then((results) => getLatLng(results[0]))
        .then((latLng) => resolve(latLng))
        .catch((error) => reject(error));
    });
  }

  // When the start location has changed
  handleStartLocationChange(location) {
    this.setState({
      startLocation: location
    });
  }

  // When the end location has changed
  handleEndLocationChange(location) {
    this.setState({
      endLocation: location
    })
  }

  // When the focus has shifted off of one of the Autocomplete components
  handleAutocompleteBlur() {
    // Make sure we have both locations set
    if (!this.state.startLocation || !this.state.endLocation) {
      return;
    }

    // So both locations are set. Send them up to the parent container
    // where they can be geocoded and displayed as markers.
    if (typeof this.displayOnMap === 'function') {
      this.displayOnMap(this.state);
    }
  }

  setDirections() {
    if (!this.state.startLocation || !this.state.endLocation) {
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

  render() {
    return (
      <div id="Controls">
        <Autocomplete
          address={this.state.startLocation}
          onChange={this.handleStartLocationChange}
          autoFocus={true}
          type={"search"}
          onBlur={this.handleAutocompleteBlur.bind(this)}
          placeholder={"Start Location"}
        />
        <Autocomplete
           address={this.state.endLocation}
           onChange={this.handleEndLocationChange}
           autoFocus={false}
           type={"search"}
           onBlur={this.handleAutocompleteBlur.bind(this)}
           placeholder={"End Location"}
        />
      </div>
    )
  }
}

export default Controls;
