import React from 'react';
import Icon from 'react-fa';
import {List, ListItem, ListDivider, RaisedButton, Avatar} from 'material-ui';
import request from 'superagent';
import $ from 'jquery';
import Notification from '../../mixins/Notification'

import ProgramActions from '../../actions/Program';
import ProgramStore from '../../stores/Program';

import '../../styles/page.less';

var notification = new Notification();

export default class list extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            programList: []
        };
    }

    componentWillMount() {
        this.unsubscribeProgramStore = ProgramStore.listen(this.onProgramStoreChange.bind(this));
        ProgramActions.fetch(this.props.params.tid);
    }

    componentWillUnmount() {
        this.unsubscribeProgramStore();
    }

    onProgramStoreChange(data) {
        this.setState({loading: false, programList: data});
    }


    push() {
        ProgramActions.push(this.props.params.tid);
    }

    getPrograms(programs, levelStr) {
        return programs.map((program)=>{

            var contentList = program.contentlist.map((content)=>{
                return (
                    <ListItem key={content.productid} primaryText={content.contenttitle} leftAvatar={<Avatar src={'http://106.38.138.61:8088/bms/public/' + content.imagepath} />} disabled={true}  />
                );
            });

            return (
                <List key={program.programid} subheader={program.timebucket + "(" + levelStr + ")"}>
                    {contentList}
                </List>
            )}
        );
    }


    render() {

        return (
            <div className="program-list-page page bg-white">
                <h2 className="title">
                    <a className="left" href="#terminal/list">返回</a>
                    设备节目单
                </h2>
                <p className="subtitle">{JSON.parse(window.localStorage.getItem('administration')).administrationName}</p>
                {this.state.loading ? '' : this.getPrograms(this.state.programList.countryProgram, '国家节目')}
                {this.state.loading ? '' : this.getPrograms(this.state.programList.provinceProgram, '省节目')}
                {this.state.loading ? '' : this.getPrograms(this.state.programList.cityProgram, '市节目')}
                {this.state.loading ? '' : this.getPrograms(this.state.programList.terminalProgram, '设备自有节目')}
                <RaisedButton style={{width: '90%', margin: '1rem 5%'}} label="推送节目单" secondary={true} onClick={this.push.bind(this)} />
            </div>
        );
    }
}