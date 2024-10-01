import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux' // to tell our app who cant get access to the Redux 'store'

import './index.css';
import App from './App';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}><App /></Provider>);
