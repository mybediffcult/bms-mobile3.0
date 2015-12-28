import React from 'react';
import Icon from 'react-fa';
import './styles/terminallist.less';

export default class TerminalList extends React.Component {
    render() {
        var list = this.props.terminalList.map((terminal, index) => {
            return (
                <li key={"terminal_" + index}>
                    <div className="left" style={{backgroundImage: 'url(' + require('./images/sbxj.png') + ')'}}></div>
                    <div className="middle">
                        <p className="name">{terminal.name}</p>
                        <a className="btn-view" href={"#/terminal/" + terminal.terminalid + "/program/list"}>查看节目单</a>
                    </div>
                    <div className="right">
                        <span className={"light " + (terminal.onlinestate == "1" ? "on" : "off")}></span>
                        <span className="online-status">{terminal.onlinestate == "1" ? "在线" : "离线"}</span>
                    </div>
                </li>
            );
        });

        return (
            <ul className="terminal-list">
                {list}
            </ul>
        );
    }
}


TerminalList.defaultProps = {
    terminalList: [
        {
            image: 'http://lorempixel.com/300/300/nature/',
            name: '设备名称',
            state: 0
        },
        {
            image: 'http://lorempixel.com/300/300/nature/',
            name: '设备名称',
            state: 1
        },
        {
            image: 'http://lorempixel.com/300/300/nature/',
            name: '设备名称',
            state: 0
        }
    ]
};
