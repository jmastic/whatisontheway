import React, { Component } from 'react';
import Autocomplete from '../../components/Autocomplete';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import './index.css'

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ''
    };
    this.onChange = (address) => this.setState({ address });
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  render() {
    return (
      <div id="Controls">
        <form onSubmit={this.handleFormSubmit}>
          <Autocomplete
            address="Down"
           />
           <Autocomplete
             address="Somewhere"
            />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default Controls;
