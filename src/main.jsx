import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './store';
import { TranslateProvider } from './core/Components/TranslateProvider';
import vi from './locales/en-vi';
import { GlobalStyle } from './GlobalStyle';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <TranslateProvider translate={{ vi }}>
            <Provider store={store}>
                <App />
            </Provider>
        </TranslateProvider>
    </BrowserRouter>,
);
