import React from 'react';
import TerminalList from '../../components/TerminalList';
import './styles/list.less';
import '../../styles/page.less';

export default class list extends React.Component {
    render() {
        return (
            <div className="terminal-list-page page">
                <h2 className="title no-border">设备列表</h2>
                <TerminalList/>
            </div>
        );
    }
}