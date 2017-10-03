import React, { Component } from 'react';
import logo from './logo.svg';
import Map from '../Map';
import Controls from '../Controls';
import PropTypes from 'prop-types';
import Script from 'react-load-script';
import './App.css';

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

  render() {
    let content;
    if (this.state.googleApiLoaded) {
      content = <div className="full-size">
        <Controls />
        <Map config={this.mapSettings} />
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
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <h1 className="App-title">Welcome to React</h1>
    //   </header>
    //   <p className="App-intro">
    //     To get started, edit <code>src/App.js</code> and save to reload.
    //   </p>
    //   <Map config={this.mapSettings} />
    // </div>
  }
}

export default App;
