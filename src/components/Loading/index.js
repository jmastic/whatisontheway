import React, { Component } from 'react';
import loadingSvg from './puff.svg';
import './index.css'

// Loading SVG from https://github.com/SamHerbert/SVG-Loaders
class LoadingMessage extends Component {
  render() {
    const content = this.props.show ?
      <div className="loading full-size">
        <div className="loading-container">
          <img
            src={loadingSvg}
            alt={"Loading"}
          />
        </div>
      </div>
      : <div></div>
    return content;
  }
}

export default LoadingMessage;
