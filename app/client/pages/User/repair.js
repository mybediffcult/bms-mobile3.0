import React from 'react';
import Icon from 'react-fa';
import moment from 'moment';
import DayPicker, { DateUtils } from "react-day-picker";
import LocaleUtils from "react-day-picker/moment";

import Notification from '../../mixins/Notification';

import NavBar from '../../components/NavBar';
import TerminalPicker from '../../components/TerminalPicker';

import UserStore from '../../stores/User';
import UserActions from '../../actions/User';

import TerminalActions from '../../actions/Terminal';
import TerminalStore from '../../stores/Terminal';

import "moment/locale/zh-cn";
import "../../styles/react-day-picker.less";
import './styles/repair.less';

var notification = new Notification();

export default class repair extends React.Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            administration: null,
            isTerminalPickerOpen: false,
            isDatePickerOpen: false,
            terminalList: [],
            selectedTerminalIdList: [],
            problemType: null,
            problem: '',
            reporterName: '',
            reporterContact: '',
            reportDate: new Date()
        };
    }

    componentWillMount() {
        this.unsubscribeUserStore = UserStore.listen(this.onUserStoreChange.bind(this));
        this.unsubscribeTerminalStore = TerminalStore.listen(this.onTerminalStoreChange.bind(this));
        UserActions.getUser();
    }

    componentWillUnmount() {
        this.unsubscribeUserStore();
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
        this.setState({terminalList: data, loaded: true});
    }


    toggleTerminalPicker() {
        this.setState({isTerminalPickerOpen: !this.state.isTerminalPickerOpen});
    }

    onTerminalPick(tids) {
        this.setState({selectedTerminalIdList: tids, isTerminalPickerOpen: false});
    }

    removeTerminal(tid) {
        console.log(tid);
        var selectedTerminalIdList = this.state.selectedTerminalIdList.filter((e)=>{
            return e != tid;
        });
        this.setState({selectedTerminalIdList: selectedTerminalIdList});
    }

    onProblemTypeChange(type) {
        this.setState({problemType: type});
    }

    onReporterChange(key, event) {
        var state = this.state;
        state[key] = event.target.value;
        this.setState({state});
    }

    onProblemChange(event) {
        this.setState({problem: event.target.value});
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
        this.setState({reportDate: day});
        this.toggleDayPicker();
    }


    onSubmit() {
        if(!this.state.selectedTerminalIdList || this.state.selectedTerminalIdList.length <= 0) {
            notification.show("请选择故障设备");
            return;
        }


        if(this.state.problemType === null) {
            notification.show("请选择故障类型");
            return;
        }

        if(this.state.problemType == (this.props.problemList.length - 1) && !this.state.problem) {
            notification.show("请填写故障原因");
            return;
        }

        if(!this.state.reporterName) {
            notification.show("请填写报修人姓名");
            return;
        }

        if(!this.state.reporterContact) {
            notification.show("请填写报修人联系方式");
            return;
        }

        var tids = this.state.selectedTerminalIdList.join(",");
        var problem = this.state.problemType == (this.props.problemList.length - 1) ? this.state.problem : this.props.problemList[this.state.problemType];
        var reporterName = this.state.reporterName;
        var reporterContact = this.state.reporterContact;
        TerminalActions.reportProblem(tids, problem, reporterName, reporterContact);
    }

    render() {

        if(this.state.loaded) {
            let self = this;
            const modifiers = {
                selected: function(day) {
                    return DateUtils.isSameDay(day, self.state.reportDate);
                },

                disabled: function(day) {
                    return DateUtils.isPastDay(day);
                }
            };

            var selectedTerminalList = this.state.terminalList.filter((terminal)=>{
                return this.state.selectedTerminalIdList.some((id)=>{
                    return id == terminal.terminalid;
                });
            }).map((terminal, index)=>{
                return (
                    <li key={"terminal-" + index}>
                        <span className="name">{terminal.name}</span>
                        <span className="icon" onClick={this.removeTerminal.bind(this, terminal.terminalid)}><Icon name="close"/></span>
                    </li>
                );
            });

            var problemList = this.props.problemList.map((problem, index)=>{
                return (
                    <li key={"problem-" + index}>
                        <input type="radio" id={"problem-" + index} checked={this.state.problemType == index} onChange={this.onProblemTypeChange.bind(this, index)} />
                        <label htmlFor={"problem-" + index}>{problem}</label>
                    </li>
                );
            });

            return (
                <div className="user-repair-page">
                    <NavBar
                        leftIcon={<Icon name="chevron-left" />}
                        onLeftClick={()=>{window.location.hash = "#/user/index"}}
                        mainText="一键报修"
                        rightText="提交"
                        onRightClick={this.onSubmit.bind(this)} />


                    <div className="terminal-box">
                        <div className="terminal-picker-trigger" onClick={this.toggleTerminalPicker.bind(this)}>
                            <span className="left"><Icon name="plus-circle" /></span>
                            <span className="middle">选择设备</span>
                            <span className="right"><Icon name="angle-right" /></span>
                        </div>

                        <ul className="selected-terminal-list">
                            {selectedTerminalList}
                        </ul>
                    </div>

                    <div className="problem">
                        <ul className="problem-list">
                            {problemList}
                        </ul>
                        <div className={"other-problem" + (this.state.problemType == (this.props.problemList.length - 1) ? "" : " hidden")}>
                            <textarea placeholder="请填写设备故障描述" value={this.state.problem} onChange={this.onProblemChange.bind(this)}></textarea>
                        </div>
                    </div>


                    <div className="report">
                        <div className="man">
                            <label htmlFor="man">报&nbsp;&nbsp;修&nbsp;&nbsp;人</label>
                            <input type="text" id="man" placeholder="报修人姓名" value={this.state.reporterName} onChange={this.onReporterChange.bind(this, 'reporterName')} />
                        </div>

                        <div className="contact">
                            <label htmlFor="contact">联系方式</label>
                            <input type="text" id="contact" placeholder="报修人联系方式" value={this.state.reporterContact} onChange={this.onReporterChange.bind(this, 'reporterContact')} />
                        </div>

                        <div className="date">
                            <label className="label">报修日期</label>
                            <div className="right">
                                <span className="val">{moment(this.state.reportDate).format('YYYY-MM-DD')}</span>
                                <Icon className="icon" name="angle-right"/>
                            </div>
                        </div>
                    </div>

                    <div className={"date-picker-dialog" + (this.state.isDatePickerOpen ? "" : " hidden")}>
                        <DayPicker localeUtils={LocaleUtils} locale="zh-cn" modifiers={modifiers} onDayClick={this.onDayPick.bind(this)} />
                    </div>

                    <TerminalPicker
                        open={this.state.isTerminalPickerOpen}
                        multiple={true}
                        terminalList={this.state.terminalList}
                        value={this.state.selectedTerminalIdList}
                        onPick={this.onTerminalPick.bind(this)}
                        onCancel={()=>{this.setState({isTerminalPickerOpen: false})}} />
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

repair.defaultProps = {
    problemList: ['无法开机', '无画面', '只显示主界面', '只播放小片', '其他']
};