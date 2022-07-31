import React, { useEffect } from "react";
import Autocomplete from "../../components/Autocomplete";
import PoiTypePicker from "../../components/PoiTypePicker";
import "./index.css";

function Controls({ setDirections, isGoogleApiLoaded }) {
  useEffect(() => {
    if (isGoogleApiLoaded) {
      window.AutocompleteFunc1();
      window.AutocompleteFunc2();
    }
  }, [isGoogleApiLoaded]);

  return (
    <div id="Controls">
      <Autocomplete
        address={""}
        onChange={() => {}}
        autoFocus={false}
        type={"search"}
        onBlur={() => {}}
        placeholder={"Start Location"}
        callbackFuncName={"AutocompleteFunc1"}
      />
      <Autocomplete
        address={""}
        onChange={() => {}}
        autoFocus={false}
        type={"search"}
        onBlur={() => {}}
        placeholder={"End Location"}
        callbackFuncName={"AutocompleteFunc2"}
      />
      <PoiTypePicker setPoiType={() => {}} />
    </div>
  );
}

// class Controls extends Component {
//   constructor(props) {
//     super(props);
//     // Default state for the controls. Should have
//     // start + end locations, and the type of place to look for
//     this.state = {
//       startLocation: "",
//       endLocation: "",
//       poiType: "",
//       className: "",
//     };
//   }

//   // When the mouse enters, try to set the classname
//   // to something else
//   onMouseEnter() {
//     if (this.state.className) {
//       return;
//     }
//     this.setState({
//       className: "set",
//     });
//   }

//   // When the start location has changed
//   handleStartLocationChange(location) {
//     this.setState({
//       startLocation: location,
//     });
//   }

//   // When the end location has changed
//   handleEndLocationChange(location) {
//     this.setState({
//       endLocation: location,
//     });
//   }

//   // When the POI Type changes, update it
//   handlePoiTypeChange(poiType) {
//     if (!poiType) {
//       return;
//     }

//     // If we clicked the same POI Type,
//     // let's toggle it
//     const newPoiType = poiType === this.state.poiType ? "" : poiType;
//     this.setState(
//       {
//         poiType: newPoiType,
//       },
//       () => {
//         this.handleAutocompleteBlur();
//       }
//     );
//   }

//   // When the focus has shifted off of one of the Autocomplete components
//   handleAutocompleteBlur() {
//     console.log("[Controls] Autocomplete was triggered");
//     // Make sure we have at least one location set
//     if (!this.state.startLocation && !this.state.endLocation) {
//       return;
//     }

//     // So we have at least one location set. Send it all up to the parent
//     // where they can be geocoded and displayed as markers.
//     if (typeof this.props.onPlacesChange === "function") {
//       this.props.onPlacesChange(this.state);
//     }
//   }

//   render() {
//     return (
//       <div id="Controls" onMouseEnter={this.onMouseEnter.bind(this)} className={this.state.className}>
//         <Autocomplete
//           address={this.state.startLocation}
//           onChange={this.handleStartLocationChange.bind(this)}
//           autoFocus={false}
//           type={"search"}
//           onBlur={this.handleAutocompleteBlur.bind(this)}
//           placeholder={"Start Location"}
//         />
//         <Autocomplete
//           address={this.state.endLocation}
//           onChange={this.handleEndLocationChange.bind(this)}
//           autoFocus={false}
//           type={"search"}
//           onBlur={this.handleAutocompleteBlur.bind(this)}
//           placeholder={"End Location"}
//         />
//         <PoiTypePicker onTypeChange={this.handlePoiTypeChange.bind(this)} activeType={this.state.poiType} />
//       </div>
//     );
//   }
// }

export default Controls;
