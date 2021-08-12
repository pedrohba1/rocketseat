import React from 'react';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import './config/ReactotronConfig';

import { ToastContainer } from 'react-toastify';
import history from './services/history';
import GlobalStyle from './styles/global';
import 'semantic-ui-css/semantic.min.css';
import Routes from './routes';
import { store, persistor } from './store';

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Router history={history}>
                    <Routes />
                    <GlobalStyle />
                    <ToastContainer autoClose={3000} />
                </Router>
            </PersistGate>
        </Provider>
    );
}

export default App;
