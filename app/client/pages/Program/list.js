import React from 'react';
import Icon from 'react-fa';
import {List, ListItem, ListDivider, RaisedButton, Avatar, DatePicker, DatePickerDialog} from 'material-ui';
import request from 'superagent';
import moment from 'moment';
import $ from 'jquery';
import Notification from '../../mixins/Notification'

import ProgramActions from '../../actions/Program';
import ProgramStore from '../../stores/Program';


import TerminalActions from '../../actions/Terminal';
import TerminalStore from '../../stores/Terminal';

import '../../styles/page.less';

var notification = new Notification();

export default class list extends React.Component {
    constructor() {
        super();
        this.state = {
            date: new Date(),
            startDate: new Date(),
            endDate: null,
            programList: []
        };
    }

    componentWillMount() {
        this.unsubscribeProgramStore = ProgramStore.listen(this.onProgramStoreChange.bind(this));
        this.unsubscribeTerminalStore = TerminalStore.listen(this.onTerminalStoreChange.bind(this));
        ProgramActions.fetch(this.props.params.tid, this.state.date);
        TerminalActions.getDateWithProgram(this.props.params.tid);
    }

    componentWillUnmount() {
        this.unsubscribeProgramStore();
        this.unsubscribeTerminalStore();
    }

    onTerminalStoreChange(data) {
        var startDate = new Date(moment(data.startdate, "YYYYMMDD").format("YYYY-MM-DD"));
        var endDate   = new Date(moment(data.enddate, "YYYYMMDD").format("YYYY-MM-DD"));
        this.setState({startDate: startDate, endDate: endDate});
    }

    onProgramStoreChange(data) {
        this.setState({programList: data});
    }


    push() {
        ProgramActions.push(this.props.params.tid);
    }

    getPrograms(programs) {
        if(programs.length > 0) {
            return programs.map((program, index)=>{

                    var timebuckets = program.timebucket.split("-");
                    var startTime   = moment(timebuckets[0], "HHmm").format("HH:mm");
                    var endTime     = moment(timebuckets[1], "HHmm").format("HH:mm");
                    var timebucket  = startTime + '-' + endTime;

                    var contentList = program.sequence.map((content, index)=>{
                        return (
                            <ListItem key={"content-" + index} primaryText={content.contenttitle} leftAvatar={<Avatar src={'http://106.38.138.61:8088/bms/public/' + content.imagepath} />} disabled={true}  />
                        );
                    });

                    return (
                        <List key={"program-" + index} subheader={timebucket + "(" + program.description + ")"}>
                            {contentList}
                        </List>
                    )}
            );
        }
        else {
            return (
                <p style={{textAlign: "center"}}>没有节目信息</p>
            );
        }

    }

    formatDate(date) {
        return moment(date).format("YYYY-MM-DD");
    }

    onDateChange(event, date) {
        this.setState({date: date});
        this.setState({programList: []});
        ProgramActions.fetch(this.props.params.tid, this.state.date);
    }

    shouldDisableDate(date) {
        if(date >= this.state.startDate && date <= this.state.endDate) {
            return false;
        }
        else {
            return true;
        }
    }

    render() {

        return (
            <div className="program-list-page page bg-white">
                <h2 className="title">
                    <a className="left" href="#terminal/list">返回</a>
                    查看节目单
                    <a className="right" href="#program/edit">创建</a>
                </h2>
                <p className="subtitle">{JSON.parse(window.localStorage.getItem('administration')).administrationName}</p>

                <DatePicker
                    value={this.state.date}
                    style={{textAlign: 'center'}}
                    textFieldStyle={{width: "86px"}}
                    autoOk={true}
                    shouldDisableDate={this.shouldDisableDate.bind(this)}
                    formatDate={this.formatDate.bind(this)}
                    onChange={this.onDateChange.bind(this)} />


                {this.getPrograms(this.state.programList)}
            </div>
        );
    }
}