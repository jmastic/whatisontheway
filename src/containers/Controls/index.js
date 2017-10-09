import React, { Component } from 'react';
import Autocomplete from '../../components/Autocomplete';
import './index.css'

class Controls extends Component {
  constructor(props) {
    super(props);
    // Default state for the controls. Should have
    // start + end locations, and the type of place to look for
    this.state = {
      startLocation: '',
      endLocation: '',
      poiType: 'pet_store'
    };
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
    });
  }

  // When the focus has shifted off of one of the Autocomplete components
  handleAutocompleteBlur() {
    console.log('[Controls] Autocomplete was triggered');
    // Make sure we have at least one location set
    if (!this.state.startLocation && !this.state.endLocation) {
      return;
    }

    // So we have at least one location set. Send it all up to the parent
    // where they can be geocoded and displayed as markers.
    if (typeof this.props.onPlacesChange === 'function') {
      this.props.onPlacesChange(this.state);
    }
  }

  render() {
    return (
      <div id="Controls">
        <Autocomplete
          address={this.state.startLocation}
          onChange={this.handleStartLocationChange.bind(this)}
          autoFocus={true}
          type={"search"}
          onBlur={this.handleAutocompleteBlur.bind(this)}
          placeholder={"Start Location"}
        />
        <Autocomplete
           address={this.state.endLocation}
           onChange={this.handleEndLocationChange.bind(this)}
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
