import React from 'react';
import ReactDOM from 'react-dom';
import axe from 'react-axe';

import { AppContainer } from 'react-hot-loader';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import translations from '../i18n/translations.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { App, rootReducer } from './components/app/app.jsx';

import APP_THEME from './theme.css';

const USER_LOCALE = navigator.language;

// Add locales
addLocaleData([ ...en, ...de ]);

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <IntlProvider locale={USER_LOCALE} messages={translations[USER_LOCALE]}>
                    <Router>
                        <Route path='/:filter?' component={Component} />
                    </Router>
                </IntlProvider>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};

render(App);

/*global module*/
if (module.hot) {
    module.hot.accept('./components/app/app.jsx', () => { render(App); });
}
/* global process*/
if(process.env.NODE_ENV !== 'production') {
    axe(React, ReactDOM, 1000);
}
