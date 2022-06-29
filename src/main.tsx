import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { CityContextProvider } from './contexts/CityContext';
import { UserSettingsProvider } from './contexts/UserSettingsContext';

// Start the mocking conditionally.
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserSettingsProvider>
      <CityContextProvider>
        <App />
      </CityContextProvider>
    </UserSettingsProvider>
  </React.StrictMode>
);
