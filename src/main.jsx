import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './redux/store.js';
import './styles/global.scss';

import Router from './Router.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store={store}>
      <Router />
   </Provider>
);
