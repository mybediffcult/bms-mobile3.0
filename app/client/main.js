import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory.js';
import App from './pages/App';
import HomeIndexPage from './pages/Home/index';
import TerminalIndexPage from './pages/Terminal/index';
import TerminalListPage from './pages/Terminal/list';
import TerminalEditPage from './pages/Terminal/edit';
import ProgramListPage from './pages/Program/list';
import ProgramEditPage from './pages/Program/edit';
import RegisterPage from './pages/Administration/register';
import LoginPage from './pages/Administration/login';
import AdministrationIndexPage from './pages/Administration/index';
import TaskIndexPage from './pages/Task/index';
import AdministrationAuthorizePage from './pages/Administration/authorize';
import AdministrationCheckPage from './pages/Administration/check';

import './styles/base.less';
import './styles/common.less';

let history = createHashHistory({
    queryKey: false
});

let routes = (
    <Router history={history}>
        <Route path="/" component={App}>
            <IndexRoute component={HomeIndexPage}/>
            <Route path="home" component={HomeIndexPage} />
            <Route path="terminal/index" component={TerminalIndexPage} />
            <Route path="terminal/list" component={TerminalListPage} />
            <Route path="terminal/edit" component={TerminalEditPage} />
            <Route path="terminal/:tid/program/list" component={ProgramListPage} />
            <Route path="terminal/:tid/program/edit" component={ProgramEditPage} />
            <Route path="administration/index" component={AdministrationIndexPage} />
            <Route path="administration/authorize" component={AdministrationAuthorizePage} />
            <Route path="administration/check" component={AdministrationCheckPage} />
            <Route path="task/index" component={TaskIndexPage} />
        </Route>
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
    </Router>
);

let injectTapEventPlugin = require("react-tap-event-plugin");

/**
 * Needed for onTouchTap
 * Can go away when react 1.0 release
 * Check this repo:
 * https://github.com/zilverline/react-tap-event-plugin
 */
injectTapEventPlugin();

ReactDOM.render(routes, document.getElementById("app"));