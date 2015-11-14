import React from 'react';
import Icon from 'react-fa';
import './styles/main.less';

export default class Navigation extends React.Component {
    render() {
        return (
            <nav id="nav" style={this.props.style}>
                <ul>
                    <li className="active">
                        <a href="#">
                            <p className="icon">
                                <Icon name="home"/>
                            </p>

                            <p className="title">
                                首页
                            </p>
                        </a>
                    </li>

                    <li>
                        <a href="#">
                            <p className="icon">
                                <Icon name="wifi"/>
                            </p>

                            <p className="title">
                                设备
                            </p>
                        </a>
                    </li>

                    <li>
                        <a href="#">
                            <p className="icon">
                                <Icon name="tasks"/>
                            </p>

                            <p className="title">
                                任务
                            </p>
                        </a>
                    </li>

                    <li>
                        <a href="#">
                            <p className="icon">
                                <Icon name="user"/>
                            </p>

                            <p className="title">
                                机构
                            </p>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
}
