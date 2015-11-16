import React from 'react';
import TerminalList from '../../components/TerminalList';
import './styles/list.less';

export default class list extends React.Component {
    render() {
        return (
            <div className="terminal-list-page">
                <h2 className="title">设备列表</h2>
                <TerminalList/>
            </div>
        );
    }
}