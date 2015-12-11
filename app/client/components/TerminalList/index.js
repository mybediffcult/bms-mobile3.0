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
            image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQm1W0mhTI8X6izQirEEAQwUlSqys3a0aSXPzBBfxruv_4v1k9pDA',
            name: '设备名称',
            state: 0
        },
        {
            image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQm1W0mhTI8X6izQirEEAQwUlSqys3a0aSXPzBBfxruv_4v1k9pDA',
            name: '设备名称',
            state: 1
        },
        {
            image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQm1W0mhTI8X6izQirEEAQwUlSqys3a0aSXPzBBfxruv_4v1k9pDA',
            name: '设备名称',
            state: 0
        }
    ]
};
