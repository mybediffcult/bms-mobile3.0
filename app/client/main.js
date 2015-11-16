import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, DefaultRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import App from './pages/App';
import HomeIndexPage from './pages/Home/index';
import TerminalIndexPage from './pages/Terminal/index';
import TerminalListPage from './pages/Terminal/list';

import './styles/base.less';
import './styles/common.less';

let history = createBrowserHistory();

let routes = (
    <Router history={history}>
        <Route path="/" component={App}>
            <Route path="home" component={HomeIndexPage} />
            <Route path="terminal/index" component={TerminalIndexPage} />
            <Route path="terminal/list" component={TerminalListPage} />
        </Route>
    </Router>
);

ReactDOM.render(routes, document.getElementById("app"));