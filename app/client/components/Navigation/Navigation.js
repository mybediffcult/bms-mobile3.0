import React from 'react';
import Icon from 'react-fa';
import './styles/navigation.less';

export default class Navigation extends React.Component {
    render() {
        var list = this.props.navList.map((nav, index)=>{
            return (
                <li key={"nav_" + index} className={window.location.hash.indexOf(nav.pattern) != -1 ? "active" : ""}>
                    <a href={nav.url}>
                        <p className="icon">
                            <Icon name={nav.icon}/>
                        </p>

                        <p className="title">
                            {nav.title}
                        </p>
                    </a>
                </li>
            );
        });

        return (
            <nav id="nav" style={this.props.style}>
                <ul>
                    {list}
                </ul>
            </nav>
        );
    }
}

Navigation.defaultProps = {
    navList: [
        {
            title: '设备巡检',
            icon: 'television',
            url: '#/terminal/list',
            pattern: '#/terminal'
        },
        {
            title: '节目单管理',
            icon: 'list',
            url: '#/program/list',
            pattern: '#/program'
        },
        {
            title: '用户',
            icon: 'user',
            url: '#/user/index',
            pattern: '#/user'
        }
    ]
};
