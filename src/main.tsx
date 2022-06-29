import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { CityContextProvider } from './contexts/CityContext';
import { UserSettingsProvider } from './contexts/UserSettingsContext';
import { WeatherContextProvider } from './contexts/WeatherContext';

// Start the mocking conditionally.
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserSettingsProvider>
      <WeatherContextProvider>
        <CityContextProvider>
          <App />
        </CityContextProvider>
      </WeatherContextProvider>
    </UserSettingsProvider>
  </React.StrictMode>
);
