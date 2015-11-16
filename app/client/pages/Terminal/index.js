import React from 'react';
import Icon from 'react-fa';
import RoundButton from '../../components/RoundButton';
import './styles/index.less';

export default class index extends React.Component {
    render() {
        return (
            <div className="terminal-index-page">
                <RoundButton link={true} href="/terminal/list" className="btn-terminal">
                    设备
                    <br/>
                    在线:13 | 离线:1
                </RoundButton>

                <p>
                    <a className="btn-add-terminal btn-danger" href="#">
                        <Icon name="plus" />&nbsp;添加设备
                    </a>
                </p>
            </div>
        );
    }
}