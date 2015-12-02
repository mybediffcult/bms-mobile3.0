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
            authorize: window.localStorage.getItem('authorize_state'),
            onlineNum: 0,
            offlineNum: 0,
            npNum: 0,
        };
    }

    componentWillMount() {
        var aid = JSON.parse(window.localStorage.getItem('administration')).administrationid;
        this.unsubscribeTerminalStore = TerminalStore.listen(this.onTerminalChange.bind(this));
        TerminalActions.getOnlineNum(aid);
        TerminalActions.getNPNum(aid);
    }

    componentWillUnmount() {
        this.unsubscribeTerminalStore();
    }

    onTerminalChange(data) {
        this.setState({onlineNum: data.onlineNum, offlineNum: data.offlineNum, npNum: data.npNum});
    }


    authorize() {
        var authorizeState = window.localStorage.getItem('authorize_state');
        if(authorizeState == 0)
            window.localStorage.setItem('authorize_state', 1);
        else
            window.localStorage.setItem('authorize_state', 0);
        this.setState({authorize: window.localStorage.getItem('authorize_state')});
    }

    render() {
        return (
            <div className="home-index-page page">
                <h2 className="title">{JSON.parse(window.localStorage.getItem('administration')).administrationName}</h2>

                <RoundButton link={true} href="#terminal/list" className="btn-terminal">
                    设备
                    <br/>
                    在线:{this.state.onlineNum} | 离线: {this.state.offlineNum}
                    <br/>
                    {this.state.npNum ? "无节目单:" + this.state.npNum : "节目信息正常"}
                </RoundButton>

                <RoundButton onClick={this.authorize.bind(this)} lineHeight="1.8rem" className="btn-terminal">
                    <Icon name="pencil" />
                    <br/>
                    {this.state.authorize == 1 ? "取消委托" : "一键委托"}
                </RoundButton>
            </div>
        );
    }
}