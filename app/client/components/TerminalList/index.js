import React from 'react';
import Icon from 'react-fa';
import './styles/index.less';

export default class TerminalList extends React.Component {
    render() {
        var list = this.props.terminalList.map((terminal, index) => {
            return (
                <li key={"terminal_" + index}>
                    <div className="name">
                        <img src={terminal.image}/>
                        <p>{terminal.name}</p>
                    </div>

                    <div className="state">
                        <a>
                           {terminal.state==1? (<p className="border-on"></p>) : (<p className="border-off"></p>)}
                            {terminal.state==1? (<p className="online">在线</p>) : (<p className="offline">离线</p>)}
                        </a>
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
