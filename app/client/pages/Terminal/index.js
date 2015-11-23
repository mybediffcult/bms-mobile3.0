import React from 'react';
import Icon from 'react-fa';
import request from 'superagent';
import RoundButton from '../../components/RoundButton';

import TerminalStore from '../../stores/Terminal';
import TerminalActions from '../../actions/Terminal';

import './styles/index.less';

export default class index extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: true,
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
        this.setState({loading: false, onlineNum: data.onlineNum, offlineNum: data.offlineNum});
    }

    render() {
        if(!this.state.loading)
        return (
            <div className="terminal-index-page">
                <RoundButton link={true} href="#terminal/list" className="btn-terminal">
                    设备
                    <br/>
                    在线:{this.state.onlineNum} | 离线: {this.state.offlineNum}
                </RoundButton>

                <p>
                    <a className="btn-add-terminal btn-danger" href="#terminal/edit">
                        <Icon name="plus" />&nbsp;添加设备
                    </a>
                </p>
            </div>
        );
        else
        return (<div className="blank-page"></div>);
    }
}