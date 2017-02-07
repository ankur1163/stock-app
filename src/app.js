import React from 'react'
import ReactDOM from 'react-dom'
import Yelphome from './components/layout/Yelphome'
import Yelphome2 from './components/layout/Yelphome2'
import Home from './components/layout/Home.js'


import Login from './Login/Login'
import Example from './Login/Example.js'
//import    Polldetail from './components/layout/Polldetail.js'; // testing different Poll details


import Container from './components/containers/Container.js';


import {Route,Router,browserHistory,hashHistory,IndexRoute} from 'react-router'
import makeMainRoutes from './components/routes'
import AuthService from './utils/AuthService'

const routes = new makeMainRoutes()

const mountNode = document.getElementById('root');
const auth = new AuthService('HNfg5DdOA7ZlawVWyGoFZX8qM2lpZQGV', 'app1163.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}


ReactDOM.render( <Router history={browserHistory}>
    <Route path="/" component={Container} auth={auth}>
    
    <IndexRoute component={Yelphome} />
      <Route path="login" component={Login} />
      <Route path="home" component={Yelphome2} />
      <Route path="example" component={Example} />
      
      
      
    </Route>
    <Route path="/home" component={Yelphome2} />
    
    
  </Router>,mountNode);