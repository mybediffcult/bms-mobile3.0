import React from 'react';
import NavBar from '../../components/NavBar';
import Navigation from '../../components/Navigation';
import TerminalList from '../../components/TerminalList';

import TerminalStore from '../../stores/Terminal';
import TerminalActions from '../../actions/Terminal';

import './styles/list.less';
import '../../styles/page.less';

export default class list extends React.Component {
    constructor() {
        super();
        this.state = {
            terminalList: []
        };
    }

    componentWillMount() {
        var aid = JSON.parse(window.localStorage.getItem('administration')).administrationid;
        this.unsubscribeTerminalStore = TerminalStore.listen(this.onTerminalChange.bind(this));
        TerminalActions.fetchAll(aid);
    }

    componentWillUnmount() {
        this.unsubscribeTerminalStore();
    }

    onTerminalChange(data) {
        this.setState({terminalList: data});
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