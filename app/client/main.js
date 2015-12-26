import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import { Router, Route, IndexRoute } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory.js';
import Container from './pages/Container';
import HomeIndexPage from './pages/Home/index';
import TerminalIndexPage from './pages/Terminal/index';
import TerminalListPage from './pages/Terminal/list';
import TerminalEditPage from './pages/Terminal/edit';
import ProgramListPage from './pages/Program/list';
import ProgramEditPage from './pages/Program/edit';

import UserLoginPage from './pages/User/login';
import UserIndexPage from './pages/User/index';

import TaskIndexPage from './pages/Task/index';
import AdministrationAuthorizePage from './pages/User/authorize';
import AdministrationCheckPage from './pages/User/check';

import './styles/base.less';
import './styles/common.less';

let history = createHashHistory({
    queryKey: false
});

let routes = (
    <Router history={history}>
        <Route path="/" component={Container}>
            <IndexRoute component={TerminalListPage}/>
            <Route path="home" component={HomeIndexPage} />
            <Route path="terminal/index" component={TerminalIndexPage} />
            <Route path="terminal/list" component={TerminalListPage} />
            <Route path="terminal/edit" component={TerminalEditPage} />
            <Route path="terminal/:tid/program/list" component={ProgramListPage} />
            <Route path="program/list" component={ProgramListPage} />
            <Route path="program/edit" component={ProgramEditPage} />
            <Route path="user/index" component={UserIndexPage} />
            <Route path="administration/authorize" component={AdministrationAuthorizePage} />
            <Route path="administration/check" component={AdministrationCheckPage} />
            <Route path="task/index" component={TaskIndexPage} />
            <Route path="user/login" component={UserLoginPage} />
        </Route>
    </Router>
);


ReactDOM.render(routes, document.getElementById("app"));
FastClick.attach(document.body);