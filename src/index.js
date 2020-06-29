import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import AuthContextProvider, { AuthContext } from './contexts/Auth';
import { IntlProvider } from 'react-intl';

import localePtBR from './locales/pt-br';
import AppStateContextProvider from './contexts/AppState';

const locales = {
  "pt-br": localePtBR, 
};

const theme = createMuiTheme({
  spacing: 8,
  palette: {
      
  }
})

ReactDOM.render(
  <React.StrictMode>
    <AppStateContextProvider>
      <AuthContextProvider>
        <AuthContext.Consumer>{() => (
          <ThemeProvider theme={theme}>
            <IntlProvider 
              locale='pt-br' 
              key='pt-br' 
              messages={locales['pt-br']}
              onError={(message) => message}
            >
              <App/>
            </IntlProvider>
          </ThemeProvider>

        )}</AuthContext.Consumer>
      </AuthContextProvider>
    </AppStateContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
