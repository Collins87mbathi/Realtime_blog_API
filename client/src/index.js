import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './Redux/store';
import {Provider} from 'react-redux';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
    <Provider store={store}>
    <App />
    </Provider>
    </CookiesProvider>
  </React.StrictMode>
);


 