import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store/configureStore';  
import registerServiceWorker from './registerServiceWorker';
import { loadHydrometries } from './actions/hydrometriesActions';

const store = configureStore();

store.dispatch(loadHydrometries());

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),   
);
registerServiceWorker();