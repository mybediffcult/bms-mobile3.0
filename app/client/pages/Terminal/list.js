import React from 'react';
import NavBar from '../../components/NavBar';
import Navigation from '../../components/Navigation';
import TerminalList from '../../components/TerminalList';

import TerminalStore from '../../stores/Terminal';
import TerminalActions from '../../actions/Terminal';

import UserStore from '../../stores/User';
import UserActions from '../../actions/User';

import './styles/list.less';
import '../../styles/page.less';

export default class list extends React.Component {
    constructor() {
        super();
        this.state = {
            administration: null,
            terminalList: []
        };
    }

    componentWillMount() {
        this.unsubscribeTerminalStore = TerminalStore.listen(this.onTerminalStoreChange.bind(this));
        this.unsubscribeUserStore = UserStore.listen(this.onUserStoreChange.bind(this));
        UserActions.getUser();
    }

    componentWillUnmount() {
        this.unsubscribeTerminalStore();
        this.unsubscribeUserStore();
    }

    onTerminalStoreChange(data) {
        this.setState({terminalList: data});
    }

    onUserStoreChange(data) {
        this.setState({administration: data}, function() {
            TerminalActions.fetchAll(this.state.administration.administrationid);
        });
    }

    render() {
        console.log(this.state.terminalList);
        return (
            <div className="terminal-list-page">
                <NavBar mainText="设备状态" />
                <TerminalList terminalList={this.state.terminalList} />
                <Navigation/>
            </div>
        );
    }
}