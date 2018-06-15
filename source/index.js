// Core
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import '@babel/polyfill';

// Instruments
import './theme/init';
import { store } from './init';

// App
import App from './components/Swapi';

render(
    <Provider store = { store }>
        <App />
    </Provider>,
    document.getElementById('app'),
);
