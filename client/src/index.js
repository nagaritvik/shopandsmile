import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Authprovider } from "./context/auth"
import { Searchprovider } from './context/search';
import 'antd/dist/reset.css'
import { Cartprovider } from './context/Cart';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Authprovider>
    <Searchprovider>
      <Cartprovider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Cartprovider>
    </Searchprovider>
  </Authprovider>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
