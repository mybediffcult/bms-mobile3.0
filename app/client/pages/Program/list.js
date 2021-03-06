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
            loaded: false,
            administration: null,
            isDatePickerOpen: false,
            isTerminalPickerOpen: false,
            date: props.params.date ? moment(props.params.date, "YYYYMMDD").toDate() : new Date(),
            startDate: new Date("2016-5-11"),
            endDate: null,
            terminalId: props.params.tid ? props.params.tid : 3,
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
            TerminalActions.fetchAll(1,200);
        });
    }

    /**
     * 监听设备数据变化
     * @param data
     */
    onTerminalStoreChange(data) {
        if(data instanceof Array) {
            if(!this.state.terminalId && data.length > 0){
                this.setState({
                    terminalList: data,
                     terminalId: data[0].terminalid, 
                     loaded: true}); 
                TerminalActions.getDateWithProgram(this.state.terminalId);
                ProgramActions.fetch(this.state.terminalId);
                }
               
            else{
                this.setState({terminalList: data, loaded: true});
                    TerminalActions.getDateWithProgram(this.state.terminalId);
                    ProgramActions.fetch(this.state.terminalId);
                }
                
        }
        else if(data){
            console.log(data);
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
        console.log(data);
        this.setState({programList: data});
    }


    /**
     * 获取节目单
     * @param programs
     * @returns {*}
     */
   getPrograms(programs) {
    console.log(programs);
        if(programs.length > 0) {
            return programs.map((program, index)=>{

                    var timebucket=program.timebucket;
                    var startTime   = moment(timebucket.start_time).format("HH:mm");
                    var endTime     = moment(timebucket.end_time).format("HH:mm");
                    var length=timebucket.end_time-timebucket.start_time;
                    var contentList = program.data.map((content, index)=>{
                        return (
                            <li key={"material-" + index}>
                                <div className="left" style={{backgroundImage: 'url(' + 'http://106.38.138.99:8080/bms/public/' + content.thumb + ')'}}>
                                </div>
                                <div className="right">
                                    <p className="title">{content.title}</p>
                                    <p className="duration"><Icon name="clock-o"/> {Math.ceil(length / 60)}分钟</p>
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
                    )
                });
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
        ProgramActions.fetch(this.state.terminalId);
    }

    /**
     * 后一天
     */
    onNextDay() {
        var date = this.state.date;
        this.setState({date: moment(date).add(1, 'day').toDate()}, function() {
            this.setState({programList: []});
            ProgramActions.fetch(this.state.terminalId);
        });
    }

    /**
     * 前一天
     */
    onPrevDay() {
        var date = this.state.date;
        this.setState({date: moment(date).subtract(1, 'day').toDate()}, function() {
            this.setState({programList: []});
            ProgramActions.fetch(this.state.terminalId);
        });
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
        this.setState({isTerminalPickerOpen: false, terminalId: terminalid}, function() {
            this.setState({programList: []});
            ProgramActions.fetch(this.state.terminalId);
        });
    }

    render() {

        console.log(this.props);
        console.log(this.state.administration);
        let self = this;
        const modifiers = {
            selected: function(day) {
                return DateUtils.isSameDay(day, self.state.date);
            },
            disabled: function(day) {
                return moment(day).subtract(1, 'day').toDate() > self.state.endDate || day < self.state.startDate;
            }
        };


        if(this.state.loaded) {

            var terminalList = this.state.terminalList;
            var terminalId   = this.state.terminalId;
            var terminalName = '';
            terminalList.forEach((terminal)=>{
                if(terminal.id == terminalId) {
                    terminalName = terminal.administration_name;
                }
            });

            return (
                <div className="program-list-page">
                    {
                        this.state.administration.is_authorized == 1 ?
                        <NavBar
                            mainText={terminalName}
                            mainIcon={<Icon name="angle-down" />}
                            onMainClick={this.toggleTerminalPicker.bind(this)} />
                            :
                            <NavBar
                                mainText={terminalName}
                                mainIcon={<Icon name="angle-down" />}
                                rightText="创建"
                                onRightClick={()=>{window.location.href = "#/program/edit"}}
                                onMainClick={this.toggleTerminalPicker.bind(this)} />
                    }


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
                        <div className="wrapper">
                            <DayPicker localeUtils={LocaleUtils} locale="zh-cn" modifiers={modifiers} onDayClick={this.onDayPick.bind(this)} />
                        </div>
                    </div>

                    <div className="program-list-box">
                        {this.getPrograms(this.state.programList) ? <ul className="program-list">{this.getPrograms(this.state.programList)}</ul> : <p style={{textAlign: 'center'}}>没有节目数据</p>}
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
        else {
            return (
                <div className="blank-page"></div>
            );
        }
    }
}