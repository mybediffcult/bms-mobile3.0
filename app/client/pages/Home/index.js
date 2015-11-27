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
            offlineNum: 0
        };
    }

    componentWillMount() {
        var aid = JSON.parse(window.localStorage.getItem('administration')).administrationid;
        this.unsubscribeTerminalStore = TerminalStore.listen(this.onTerminalChange.bind(this));
        //TerminalActions.getOnlineNum(aid);
        //TerminalActions.getNPNum(aid);
    }

    componentWillUnmount() {
        this.unsubscribeTerminalStore();
    }

    onTerminalChange(data) {
        console.log(data);
        this.setState({onlineNum: data.onlineNum, offlineNum: data.offlineNum});
    }


    authorize() {
        var authorizeState = window.localStorage.getItem('authorize_state');
        if(!authorizeState)
            window.localStorage.setItem('authorize_state', 1);
        else if(authorizeState == 1)
            window.localStorage.setItem('authorize_state', 2);
        this.setState({authorize: window.localStorage.getItem('authorize_state')});
    }

    render() {
        //console.log(JSON.parse(window.localStorage.getItem('administration')));
        return (
            <div className="home-index-page page">
                <h2 className="title">健康传播卫星网服务管理中心</h2>

                <RoundButton link={true} href="#terminal/list" className="btn-terminal">
                    设备
                    <br/>
                    在线:{this.state.onlineNum} | 离线: {this.state.offlineNum}
                </RoundButton>

                <RoundButton link={true} href="#terminal/list" className="btn-terminal">
                    {"节目信息正常"}
                </RoundButton>

                <RoundButton onClick={this.authorize.bind(this)} lineHeight="1.8rem" className="btn-terminal">
                    <Icon name="pencil" />
                    <br/>
                    {!this.state.authorize ? "一键委托" : (this.state.authorize == 1 ? "取消委托" : "取消委托审核中")}
                </RoundButton>
            </div>
        );
    }
}