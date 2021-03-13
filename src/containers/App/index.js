import React, { Component } from 'react';
import Map from '../Map';
import Controls from '../Controls';
import PropTypes from 'prop-types';
import Script from 'react-load-script';
import searchRouteBox from '../../utils/searchRouteBox';
import LoadingMessage from '../../components/Loading';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      googleApiLoaded: false,
      mapRef: null,
      loading: true,
      startAddress: null,
      endAddresss: null,
      directions: null,
      markers: [],
      drawBoxes: false,
      poiType: null,
      boxes: []
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

  // When the Google Map has mounted, save the map ref
  // so it can be used by the route boxer script
  onMapMounted(mapRef) {
    if (mapRef && !this.state.mapRef) {
      console.log('[app] Map mounted', mapRef);
      this.setState({
        mapRef: mapRef.context[Object.keys(mapRef.context)[0]],
        loading: false
      });
    }
  }

  // We are setting this handler so that the ">" key
  // can be used to turn on + off the drawing of route boxes.
  // It's kind of neat to look at.
  handleKeyPress(event) {
    if (event.keyCode === 190 && event.shiftKey) {
      this.setState({
        drawBoxes: !!!this.state.drawBoxes
      });
    }
    if (event.keyCode === 27) {
      // Hide all info windows on escape key
      this.hideAllMarkerInfoWindows.call(this);
    }
  }

  // When the Google API script has been created on the DOM
  handleScriptCreate() {
    console.log('[app] Google Map script created');
    this.setState({
      googleApiLoaded: false
    });
  }

  // When the Google API script loading caused an error
  handleScriptError() {
    console.log('[app] Google Map script load error');
    this.setState({
      googleApiError: true
    });
  }

  // When the Google API script has finished loading
  handleScriptLoad() {
    console.log('[app] Google Map script loaded');
    this.setState({
      googleApiLoaded: true
    });
  }

  // Get directions from one latlng to another
  getDirections(start, end) {
    return new Promise((resolve, reject) => {
      if (!start || !end) {
        return reject(`Start or End was not specified`);
      }

      const google = window.google,
        DirectionsService = new google.maps.DirectionsService(),
        origin = new google.maps.LatLng(start.lat, start.lng),
        destination = new google.maps.LatLng(end.lat, end.lng),
        travelMode = google.maps.TravelMode.DRIVING;

      DirectionsService.route({
        origin: origin,
        destination: destination,
        travelMode: travelMode
      }, (result, status) => {
        return status === google.maps.DirectionsStatus.OK
          ? resolve(result)
          : reject(result);
      });
    });
  }

  // Generate a lat/lng from a string address
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

  // When a marker on the map is clicked
  // We do this here to take advantage of the mapRef that gets passed
  // up to this level of the app
  handleMarkerClick(marker) {
    // console.log('[app] Marker was clicked', marker);
    // Get the details for this marker
    this.getMarkerDetails(marker)
      .then((details) => {
        this.setState({
          markers: this.state.markers.map((mark) => {
            if (mark.place_id === marker.place_id) {
              mark.details = details;
              // Also toggle this marker's info window
              mark.isInfoWindowOpen = !!!mark.isInfoWindowOpen;
              return mark;
            }
            // For all other markers, close the info window
            mark.isInfoWindowOpen = false;
            return mark;
          })
        });
      });
  }

  // Hide all marker info windows
  hideAllMarkerInfoWindows() {
    if (!this.state.markers || !this.state.markers.length) {
      return;
    }
    this.setState({
      markers: this.state.markers.map((marker) => {
        marker.isInfoWindowOpen = false;
        return marker;
      })
    });
  }

  // Get the details for a place/marker
  getMarkerDetails(marker) {
    return new Promise((resolve, reject) => {
      // If the marker already has place details,
      // there's no need to call Google to get them again
      if (marker.details) {
        return resolve(marker.details);
      }

      let placeRequest = { };
      if (marker.reference) {
        placeRequest.reference = marker.reference;
      }
      if (marker.placeId) {
        placeRequest.placeId = marker.placeId;
      }
      const google = window.google;
      const service = new google.maps.places.PlacesService(this.state.mapRef);
  		service.getDetails(placeRequest, (details, status) => {
        return details ? resolve(details) : reject(details);
      });
    });
  }

  // When a place has been changed by the Controls container
  onPlacesChange(controls) {
    console.log('[app] Places updated', controls);
    const startAddress = controls.startLocation,
      endAddress = controls.endLocation,
      poiType = controls.poiType;

    // No need to update if nothing has changed
    if (startAddress === this.state.startAddress
      && endAddress === this.state.endAddress
      && poiType === this.state.poiType
    ) {
      return;
    }

    if (poiType !== this.state.poiType) {
      this.setState({
        poiType: poiType
      });
    }

    // We're going to be looking up stuff, so show a loading message
    this.setState({
      loading: true
    });

    // Save the addresses in state so we don't needlessly re-call Google APIs
    this.setState({
      startAddress: startAddress,
      endAddress: endAddress
    });

    // If we only have one of the two addresses, we should just put a marker
    // on the map
    if ((startAddress && !endAddress)) {
      return this.addMarker.call(this, startAddress);
    }
    if ((endAddress && !startAddress)) {
      return this.addMarker.call(this, endAddress);
    }

    // Addresses actually changed. Get the directions, search the route,
    // and display the results.
    Promise.all([
      new Promise((resolve, reject) => {
        this.geocodeAddress(startAddress)
          .then((latLng) => resolve({ origin: latLng }));
      }),
      new Promise((resolve, reject) => {
        this.geocodeAddress(endAddress)
          .then((latLng) => resolve({ destination: latLng }));
      })
    ])
    .then((values) => {
      const origin = values[0].origin || values[1].origin;
      const destination = values[0].destination || values[1].destination;
      this.getDirections(origin, destination)
        .then((directions) => {
          console.log('[app] Got directions', directions);
          this.setState({
            directions: directions,
            loading: false
          });
          // Now get the route boxes
          searchRouteBox(this.state.directions, this.state.poiType, this.state.mapRef)
            .then((results) => {
              this.setState({
                markers: results.places,
                boxes: results.boxes
              });
            })
        });
    });
  }

  // Add a single marker, remove all other markers
  addMarker(address) {
    geocodeByAddress(address)
      .then((results) => {
        let marker = results[0];
        marker.details = results[0];
        this.setState({
          markers: [marker],
          loading: false
        });
        this.state.mapRef.fitBounds(marker.geometry.viewport);
      });
  }

  render() {
    let content;
    if (this.state.googleApiLoaded) {
      content = <div className="full-size" onKeyDown={this.handleKeyPress.bind(this)}>
        <LoadingMessage
          show={this.state.loading}
        />
        <Controls
          onPlacesChange={this.onPlacesChange.bind(this)}
        />
        <Map
          directions={this.state.directions}
          markers={this.state.markers}
          onMarkerClick={this.handleMarkerClick.bind(this)}
          drawBoxes={this.state.drawBoxes}
          boxes={this.state.boxes}
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
