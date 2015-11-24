import React from 'react';
import Icon from 'react-fa';
import {RaisedButton, List, ListItem} from 'material-ui';
import RoundButton from '../../components/RoundButton';

import TerminalStore from '../../stores/Terminal';
import TerminalActions from '../../actions/Terminal';

import './styles/index.less';
import '../../styles/page.less';

export default class index extends React.Component {
    constructor() {
        super();
        this.state = {
            isSigned: window.localStorage.getItem('isSigned'),
            onlineNum: 0,
            offlineNum: 0
        };
    }

    componentWillMount() {
        var aid = JSON.parse(window.localStorage.getItem('administration')).administrationid;
        this.unsubscribeTerminalStore = TerminalStore.listen(this.onTerminalChange.bind(this));
        TerminalActions.getOnlineNum(aid);
    }

    componentWillUnmount() {
        this.unsubscribeTerminalStore();
    }

    onTerminalChange(data) {
        this.setState({onlineNum: data.onlineNum, offlineNum: data.offlineNum});
    }


    signup() {
        window.localStorage.setItem('isSigned', true);
        this.setState({isSigned: true});
    }

    render() {

        return (
            <div className="home-index-page page">
                <h2 className="title">健康传播卫星网服务管理中心</h2>

                <RoundButton link={true} href="#terminal/list" className="btn-terminal">
                    设备
                    <br/>
                    在线:{this.state.onlineNum} | 离线: {this.state.offlineNum}
                </RoundButton>

                <div className="program-info">
                    <h2>节目信息</h2>
                    <p>您还没制作明天的节目</p>
                </div>

                <RoundButton onClick={this.signup.bind(this)} lineHeight="1.8rem" className="btn-terminal">
                    <Icon name="pencil" />
                    <br/>
                    {this.state.isSigned ? '已签到' : '签到'}
                </RoundButton>

                <RaisedButton style={{width: '90%', margin: '0 5%'}} label="一键委托" secondary={true} />
            </div>
        );
    }
}