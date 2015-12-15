import React from 'react';
import Icon from 'react-fa';
import './styles/index.less';

export default class TerminalList extends React.Component {
    render() {
        var list = this.props.terminalList.map((terminal, index) => {
            return (
                <li key={"terminal_" + index}>
                    <a href={"#/terminal/" + terminal.terminalid + "/program/list"}>
                    <div className="name">
                        <img src="http://lorempixel.com/300/300/nature/"/>
                        <p>{terminal.name}</p>
                    </div>

                    <div className="state">
                        <div className="light">
                           {terminal.onlinestate==1? (<p className="border-on"></p>) : (<p className="border-off"></p>)}
                            {terminal.onlinestate==1? (<p className="online">在线</p>) : (<p className="offline">离线</p>)}
                        </div>
                    </div>
                    </a>
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
