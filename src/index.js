import React from 'react';
import ReactDOM from 'react-dom';

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

const USER_LOCALE = navigator.language;

// Add locales
addLocaleData([ ...en, ...de ]);

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

const render = Component => {
    ReactDOM.render(
        React.createElement(
            AppContainer, {},
            React.createElement(
                Provider, { store },
                React.createElement(
                    IntlProvider, { locale: USER_LOCALE, messages: translations[USER_LOCALE] },
                    React.createElement(
                        Router, {},
                        React.createElement(
                            Route, { path: '/:filter?', component: Component }
                        )
                    )
                )
            )
        ),
        document.getElementById('root')
    );
};

render(App);

/*global module*/
if (module.hot) {
    module.hot.accept('./components/app/app.jsx', () => { render(App); });
}
