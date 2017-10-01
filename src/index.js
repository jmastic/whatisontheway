import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootEl = document.getElementById('root');
const render = (Component) =>
  ReactDOM.render(
    <App>
      <Component />
    </App>,
    rootEl
  );

render(App);
registerServiceWorker();

if (module.hot) {
  module.hot.accept('./App', () => render(App));
}
