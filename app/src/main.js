import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';

import './main.scss';

import Root from './containers/Root.js';
import configureStore from './store/configureStore.js';

const store = configureStore();

const fastClickOptions = {
  //touchBoundary: 10, //default: 10
  tapDelay: 100 //default: 200
  //tapTimeout: 700 //default: 700
};
FastClick.attach(document.body, fastClickOptions);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('content')
);
