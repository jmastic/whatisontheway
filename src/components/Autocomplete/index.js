import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete'
import './index.css'

class Autocomplete extends Component {
  render() {
    const inputProps = {
      value: this.props.address,
      onChange: this.props.onChange,
      placeholder: this.props.placeholder,
      onBlur: this.props.onBlur,
      type: this.props.type,
      autoFocus: this.props.autoFocus
    }

    return (
      <PlacesAutocomplete inputProps={inputProps} />
    )
  }
}

export default Autocomplete;
