import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

// importing sea
import 'semantic-ui-css/semantic.min.css'


import Login from './components/Auth/Login'
import Register from './components/Auth/Register'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// @Notes
// using the exact keyword is necessary to match routes
const Root = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </Switch>
    </Router>
)

ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.unregister();
