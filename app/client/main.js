import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import App from './pages/App';

let history = createBrowserHistory();

let routes = (
    <Router history={history}>
        <Route path="/" component={App}>

        </Route>
    </Router>
);

ReactDOM.render(routes, document.getElementById("app"));