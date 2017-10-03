import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class Autocomplete extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('render ac', this.props);
    const inputProps = {
      value: this.props.address,
      onChange: () => { },
    }

    return (
      <PlacesAutocomplete inputProps={inputProps} />
    )
  }
}

export default Autocomplete;
