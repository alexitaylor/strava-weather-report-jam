import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { CityContextProvider } from './contexts/CityContext';
import { UserSettingsProvider } from './contexts/UserSettingsContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserSettingsProvider>
      <CityContextProvider>
        <App />
      </CityContextProvider>
    </UserSettingsProvider>
  </React.StrictMode>
);
