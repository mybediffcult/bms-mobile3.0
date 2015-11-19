import React from 'react';
import Icon from 'react-fa';
import request from 'superagent';
import RoundButton from '../../components/RoundButton';
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
        request.get('http://106.38.138.61:3000/api/administration/' + aid + '/terminal_num').end((error, res)=>{
            var result = res.body;
            if(result.status == 200) {
                this.setState({onlineNum: result.data.onlineNum, offlineNum: result.data.offlineNum});
            }
            this.setState({loading: false});
        })
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