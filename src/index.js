import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import pickerPtBrLocale from "date-fns/locale/pt-BR";

import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import AuthContextProvider, { AuthContext } from './contexts/Auth';
import { IntlProvider } from 'react-intl';

import intlPtBrLocale from './locales/pt-br';
import AppStateContextProvider from './contexts/AppState';

const intlLocales = {
  "pt-br": intlPtBrLocale, 
};

const pickerLocales = {
  "pt-br": pickerPtBrLocale, 
}

const theme = createMuiTheme({
  spacing: 8,
  palette: {
      primary: {
          main: "#26292d",
      }
      , secondary: {
          main: "#fcfffc",
      }
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
              messages={intlLocales['pt-br']}
              onError={(message) => message}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pickerLocales['pt-br']}>
                <App/>
              </MuiPickersUtilsProvider>
            </IntlProvider>
          </ThemeProvider>

        )}</AuthContext.Consumer>
      </AuthContextProvider>
    </AppStateContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

console.log(`[ENV=${(process.env.NODE_ENV || "NOT DEFINED")}]`);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
