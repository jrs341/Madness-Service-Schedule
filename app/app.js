import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux"
import routes from './config/routes'
import store from "./store"

// ReactDOM.render(routes, document.getElementById('app'));

// add the store when passing props

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
document.getElementById('app'));