import React from 'react';
import Icon from 'react-fa';
import './styles/index.less';

export default class Navigation extends React.Component {
    render() {
        console.log(window.location.hash);
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
            title: '巡检',
            icon: 'home',
            url: '#/terminal/list',
            pattern: '#/terminal'
        },
        {
            title: '节目单管理',
            icon: 'tasks',
            url: '#/program/edit',
            pattern: '#/program'
        },
        {
            title: '用户',
            icon: 'user',
            url: '#/administration/index',
            pattern: '#/administration'
        }
    ]
};
