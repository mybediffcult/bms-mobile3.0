import React from 'react';
import Icon from 'react-fa';

import request from 'superagent';
import moment from 'moment';

import NavBar from '../../components/NavBar';
import Navigation from '../../components/Navigation';
import DayPicker, { DateUtils } from "react-day-picker";
import LocaleUtils from "react-day-picker/moment";
import TerminalPicker from '../../components/TerminalPicker';

import UserStore from '../../stores/User';
import UserActions from '../../actions/User';

import ProgramActions from '../../actions/Program';
import ProgramStore from '../../stores/Program';

import TerminalActions from '../../actions/Terminal';
import TerminalStore from '../../stores/Terminal';

import "moment/locale/zh-cn";
import "../../styles/react-day-picker.less";
import './styles/list.less';


export default class list extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            administration: null,
            isDatePickerOpen: false,
            isTerminalPickerOpen: false,
            date: new Date(),
            startDate: new Date("2015-10-01"),
            endDate: null,
            terminalId: props.tid ? props.tid : null,
            terminalList: [],
            programList: []
        };
    }

    componentWillMount() {
        this.unsubscribeUserStore = UserStore.listen(this.onUserStoreChange.bind(this));
        this.unsubscribeProgramStore = ProgramStore.listen(this.onProgramStoreChange.bind(this));
        this.unsubscribeTerminalStore = TerminalStore.listen(this.onTerminalStoreChange.bind(this));
        UserActions.getUser();
    }

    componentWillUnmount() {
        this.unsubscribeUserStore
        this.unsubscribeProgramStore();
        this.unsubscribeTerminalStore();
    }

    /**
     * 监听用户数据变化
     * @param data
     */
    onUserStoreChange(data) {
        this.setState({administration: data}, function() {
            TerminalActions.fetchAll(this.state.administration.administrationid);
        });
    }

    /**
     * 监听设备数据变化
     * @param data
     */
    onTerminalStoreChange(data) {
        if(data instanceof Array) {
            if(!this.state.terminalId && data.length > 0)
                this.setState({terminalList: data, terminalId: data[0].terminalid}, function() {
                    TerminalActions.getDateWithProgram(this.state.terminalId);
                    ProgramActions.fetch(this.state.terminalId, this.state.date);
                });
            else
                this.setState({terminalList: data}, function() {
                    TerminalActions.getDateWithProgram(this.state.terminalId);
                    ProgramActions.fetch(this.state.terminalId, this.state.date);
                });
        }
        else if(data){
            if(data.startdate) {
                this.setState({startDate: moment(data.startdate, "YYYYMMDD").toDate()});
            }

            if(data.enddate) {
                this.setState({endDate: moment(data.enddate, "YYYYMMDD").toDate()});
            }

        }
    }

    /**
     * 监听节目单数据变化
     * @param data
     */
    onProgramStoreChange(data) {
        this.setState({programList: data});
    }


    /**
     * 获取节目单
     * @param programs
     * @returns {*}
     */
    getPrograms(programs) {
        if(programs.length > 0) {
            return programs.map((program, index)=>{

                    var timebuckets = program.timebucket.split("-");
                    var startTime   = moment(timebuckets[0], "HHmm").format("HH:mm");
                    var endTime     = moment(timebuckets[1], "HHmm").format("HH:mm");

                    var contentList = program.sequence.map((content, index)=>{
                        return (
                            <li key={"material-" + index}>
                                <div className="left" style={{backgroundImage: 'url(' + 'http://106.38.138.99:8080/bms/public/' + content.imagepath + ')'}}>
                                </div>
                                <div className="right">
                                    <p className="title">{content.contenttitle}</p>
                                    <p className="duration"><Icon name="clock-o"/> {Math.ceil(content.length / 60)}分钟</p>
                                </div>
                            </li>
                        );
                    });

                    return (
                        <li key={"program-" + index}>
                            <div className="time">{startTime}</div>
                            <ul className="material-list">
                                {contentList}
                            </ul>
                        </li>
                    )}
            );
        }
        else {
            return null;
        }
    }


    /**
     * 日期选择触发
     */
    toggleDayPicker() {
        this.setState({isDatePickerOpen: !this.state.isDatePickerOpen});
    }

    /**
     * 日期选择回调
     * @param e
     * @param day
     * @param modifiers
     */
    onDayPick(e, day, modifiers) {
        if(modifiers == "disabled") {
            return;
        }
        this.setState({date: day});
        this.toggleDayPicker();
        this.setState({programList: []});
        ProgramActions.fetch(this.state.terminalId, this.state.date);
    }

    /**
     * 后一天
     */
    onNextDay() {
        var date = this.state.date;
        this.setState({date: moment(date).add(1, 'day').toDate()});
        this.setState({programList: []});
        ProgramActions.fetch(this.state.terminalId, this.state.date);
    }

    /**
     * 前一天
     */
    onPrevDay() {
        var date = this.state.date;
        this.setState({date: moment(date).subtract(1, 'day').toDate()});
        this.setState({programList: []});
        ProgramActions.fetch(this.state.terminalId, this.state.date);
    }

    /**
     * 设备选择触发
     */
    toggleTerminalPicker() {
        this.setState({isTerminalPickerOpen: !this.state.isTerminalPickerOpen});
    }

    /**
     * 设备选择回调
     * @param terminalid
     */
    onTerminalPick(terminalid) {
        this.setState({isTerminalPickerOpen: false, terminalId: terminalid});
    }

    render() {
        let self = this;
        const modifiers = {
            selected: function(day) {
                return DateUtils.isSameDay(day, self.state.date);
            },
            disabled: function(day) {
                return day > self.state.endDate || day < self.state.startDate;
            }
        };

        /*if(this.state.terminalId && this.state.terminalList.length > 0) {
         var terminal = this.state.terminalList.find((item)=>{
         return item.terminalid == this.state.terminalId;
         });
         }
         else {
         var terminal = null;
         }*/


        return (
            <div className="program-list-page">
                <NavBar
                    mainText="设备"
                    mainIcon={<Icon name="angle-down" />}
                    rightText="创建"
                    onRightClick={()=>{window.location.href = "#/program/edit"}}
                    onMainClick={this.toggleTerminalPicker.bind(this)} />

                <div className="date">
                    <div className="left">
                        <span className="wrapper" onClick={this.onPrevDay.bind(this)}>前一天</span>
                    </div>

                    <div className="middle" onClick={this.toggleDayPicker.bind(this)}>
                        {moment(this.state.date).format("YYYY-MM-DD")}
                        <span className="icon">
                            <Icon name="angle-down" />
                        </span>
                    </div>

                    <div className="right">
                        <span className="wrapper" onClick={this.onNextDay.bind(this)}>后一天</span>
                    </div>
                </div>

                <div className={"date-picker-dialog" + (this.state.isDatePickerOpen ? "" : " hidden")}>
                    <DayPicker localeUtils={LocaleUtils} locale="zh-cn" modifiers={modifiers} onDayClick={this.onDayPick.bind(this)} />
                </div>

                <div className="program-list-box">
                    {this.getPrograms(this.state.programList) ? <ul className="program-list">{this.getPrograms(this.state.programList)}</ul> : <p style={{textAlign: 'center'}}></p>}
                </div>

                <TerminalPicker
                    open={this.state.isTerminalPickerOpen}
                    value={this.state.terminalId}
                    terminalList={this.state.terminalList}
                    onPick={this.onTerminalPick.bind(this)}
                    onCancel={()=>{this.setState({isTerminalPickerOpen: false})}} />
                <Navigation/>
            </div>
        );
    }
}