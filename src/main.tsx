import { MantineUIThemeProvider } from '@snoconedev/mantine-ui';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineUIThemeProvider appThemeName='golboys_theme' applyGradients>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineUIThemeProvider>
  </React.StrictMode>
)

