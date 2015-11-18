import React from 'react';
import Icon from 'react-fa';
import './styles/index.less';

export default class TerminalList extends React.Component {
    render() {
        var list = this.props.terminalList.map((terminal, index) => {
            return (
                <li key={"terminal_" + index}>
                    <p>
                        {terminal.terminalid}
                    </p>
                    <p>
                        {terminal.name}
                    </p>

                    {terminal.onlinestate == 1 ? (<p className="online">在线</p>) : (<p className="offline">离线</p>)}

                    <p>
                        <a className="btn-warning" href={"#terminal/" + terminal.terminalid + "/program/list"}>
                            <Icon name="search" />&nbsp;查看节目单
                        </a>
                        <a className="btn-primary" href={"#terminal/" + terminal.terminalid + "/program/edit"}>
                            <Icon name="plus" />&nbsp;创建节目单
                        </a>
                    </p>
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
            terminal_no: '2EH00003377I',
            name: '北京市海淀区神舟大厦-测',
            online_state: 0
        },
        {
            terminal_no: '2EH00003377I',
            name: '北京市海淀区神舟大厦-测',
            online_state: 1
        },
        {
            terminal_no: '2EH00003377I',
            name: '北京市海淀区神舟大厦-测',
            online_state: 0
        }
    ]
};
