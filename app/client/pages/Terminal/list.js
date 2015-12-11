import React from 'react';
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
            <div className="terminal-list-page page">
                <h2 className="title no-border">
                    {JSON.parse(window.localStorage.getItem('administration')).administrationName}
                    <a className="right" href="#/terminal/edit">创建设备</a>
                </h2>
                <TerminalList />
            </div>
        );
    }
}