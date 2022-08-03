import React, { Component } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import "./index.css";

class Autocomplete extends Component {
  render() {
    return (
      <PlacesAutocomplete
        value={this.props.address}
        onChange={this.props.onChange || function () {}}
        placeholder={this.props.placeholder}
        onBlur={this.props.onBlur}
        type={this.props.type}
        autoFocus={this.props.autoFocus}
        children={() => <></>}
      />
    );
  }
}

export default Autocomplete;
