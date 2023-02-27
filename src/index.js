import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// どこでもつかえるように用意している
import { Provider } from 'react-redux';
// グローバルで共有するためにstoreをインポートする
import { store } from "./redux/store";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* providerでAppを囲んで、App全体につかえるようにする */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
