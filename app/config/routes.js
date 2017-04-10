import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import Main from '../pages/Main'
import ServiceSchedule from '../pages/ServiceSchedule'
import ServiceForm from '../pages/ServiceForm'

module.exports = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
    	<Route path="serviceSchedule" component={ServiceSchedule} />
      <IndexRoute component={ServiceForm} />
    </Route>
  </Router>
);
