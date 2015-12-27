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


    render() {


        return (
            <div className="program-list-page">
                <NavBar
                    mainText="设备"
                    mainIcon={<Icon name="angle-down" />}
                    rightText="创建"
                    onRightClick={()=>{window.location.href = "#/program/edit"}}/>


                <Navigation/>
            </div>
        );
    }
}