import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import User from './User'
import Visit from './visit'
import Notfound from './Notfound'
import {Route,Link,BrowserRouter as Router,Switch} from 'react-router-dom'


const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/User" component={User}/>
      <Route path="/Visit" component={Visit}/>
      <Route component={Notfound}/>
    </Switch>
  </Router>
)

ReactDOM.render(
  routing,document.getElementById("root")
)
