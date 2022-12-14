import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter} from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css'

import './index.css'

import store from "../src/redux/store"
import {Provider} from "react-redux"

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover={false}
        theme="dark"
        />

          <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
