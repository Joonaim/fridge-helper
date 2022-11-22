import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import UserContext from './Components/UserContext';
import {Theme} from './Components/Theme'

import { ThemeProvider } from '@mui/material/styles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContext>
        <ThemeProvider theme={Theme}>
            <App />
        </ThemeProvider>
    </UserContext>
  </React.StrictMode>
)