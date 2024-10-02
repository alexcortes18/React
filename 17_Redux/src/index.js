import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux' // to tell our app who cant get access to the Redux 'store'

import './index.css';
import App from './App';

/*
Use either from:
index.js -> to use the normal Redux.
index-redux-toolkit-store.js -> to use the Redux-toolkit

Also remember that the component:
Counter-old -> works with index.js
Counter -> works with index-redux-toolkit-store.js

So you need to use the correct component inside App.js
*/

// import store from './store'; //JS already looks for the file named index.js in the folder.
import store from './store/index-redux-toolkit-store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}><App /></Provider>);
