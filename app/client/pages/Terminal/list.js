import React from 'react';
import TerminalList from '../../components/TerminalList';
import request from 'superagent';
import Loading from '../../components/Loading';
import Notification from '../../mixins/Notification';
import './styles/list.less';
import '../../styles/page.less';

var notification = new Notification();

export default class list extends React.Component {
    constructor() {
        super();
        this.state = {
            terminalList: []
        };
    }

    componentWillMount() {
        var aid = JSON.parse(window.localStorage.getItem('administration'));
        if(!aid) {
            notification.show('未登录', function() {
                window.location.hash = '#/login';
            });
            return;
        }
        aid = aid.administrationid;

        request.get('http://106.38.138.61:3000/api/administration/' + aid + '/terminals').end((error, res)=>{
            var result = res.body;
            if(result.status == 200) {
                var terminalList = result.data;
                this.setState({terminalList: terminalList});
            }
        })

    }

    render() {
        console.log(this.state.terminalList);
        return (
            <div className="terminal-list-page page">
                <h2 className="title no-border">设备列表</h2>
                <TerminalList terminalList={this.state.terminalList}/>
            </div>
        );
    }
}