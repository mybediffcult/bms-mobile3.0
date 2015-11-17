import React from 'react';
import Icon from 'react-fa';
import './styles/index.less';

export default class Navigation extends React.Component {
    render() {
        var list = this.props.navList.map((nav, index)=>{
            return (
                <li key={"nav_" + index} className={index == 0 ? "active" : ""}>
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
            title: '首页',
            icon: 'home',
            url: '/home'
        },
        {
            title: '设备',
            icon: 'wifi',
            url: '/terminal/index'
        },
        {
            title: '任务',
            icon: 'tasks',
            url: '/task/index'
        },
        {
            title: '机构',
            icon: 'user',
            url: '/administration/index'
        }
    ]
};
