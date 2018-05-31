import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import $ from 'jquery';


// componentsss
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Logout from './components/Logout.jsx';
import Lists from './components/Lists.jsx';

const Test = () => (<div>Testing this shiz out </div>);
const App = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/register' component={Register}/>
      <Route exact path='/logout' component={Logout}/>
      <Route exact path='/lists' component={Lists}/>

    </Switch>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('app'));


/*
/'
/login
/register
'/logout
/list
*/