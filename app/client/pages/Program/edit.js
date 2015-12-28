import React from 'react';
import Icon from 'react-fa';
import moment from 'moment';
import request from 'superagent';
import Notification from '../../mixins/Notification';


import NavBar from '../../components/NavBar';
import Navigation from '../../components/Navigation';
import DayPicker, { DateUtils } from "react-day-picker";
import LocaleUtils from "react-day-picker/moment";
import TerminalPicker from '../../components/TerminalPicker';
import ProgressBar from '../../components/ProgressBar';
import ProgramPreview from '../../components/ProgramPreview';

import UserStore from '../../stores/User';
import UserActions from '../../actions/User';

import TerminalActions from '../../actions/Terminal';
import TerminalStore from '../../stores/Terminal';

import TimebucketActions from '../../actions/Timebucket';
import TimebucketStore from '../../stores/Timebucket';

import MaterialActions from '../../actions/Material';
import MaterialStore from '../../stores/Material';

import ProgramActions from '../../actions/Program';


import "moment/locale/zh-cn";
import "../../styles/react-day-picker.less";
import './styles/edit.less';

var notification = new Notification();

export default class edit extends React.Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            administration: null,
            isDatePickerOpen: false,
            isTerminalPickerOpen: false,
            searching: false,
            keyword: '',
            sort: 'desc',
            page: 1,
            isLastPage: false,
            date: new Date(),
            startDate: null,
            endDate: null,
            terminalId: null,
            progress: 0,
            terminalList: [],
            materialList: [],
            timebucketList: [],
            selectedMaterialList: []
        };
    }

    componentWillMount() {
        this.unsubscribeUserStore = UserStore.listen(this.onUserStoreChange.bind(this));
        this.unsubscribeTerminalStore = TerminalStore.listen(this.onTerminalStoreChange.bind(this));
        this.unsubscribeTimebucketStore = TimebucketStore.listen(this.onTimebucketStoreChange.bind(this));
        this.unsubscribeMaterialStore = MaterialStore.listen(this.onMaterialStoreChange.bind(this));
        UserActions.getUser();
    }

    componentWillUnmount() {
        this.unsubscribeUserStore();
        this.unsubscribeTerminalStore();
        this.unsubscribeTimebucketStore();
        this.unsubscribeMaterialStore();
    }

    /**
     * 监听用户数据变化
     * @param data
     */
    onUserStoreChange(data) {
        this.setState({administration: data}, function() {
            TerminalActions.fetchAll(this.state.administration.administrationid);
            TimebucketActions.fetch(this.state.administration.administrationid);
        });
    }


    /**
     * 监听设备数据变化
     * @param data
     */
    onTerminalStoreChange(data) {
        if(data instanceof Array) {
            this.setState({terminalList: data, loaded: true});
            if(!this.state.terminalId) {
                this.setState({terminalId: this.state.terminalList[0].terminalid}, function() {
                    TerminalActions.getDateWithProgram(this.state.terminalId);
                    MaterialActions.fetch(this.state.terminalId, this.state.keyword, 'length|' + this.state.sort);
                });
            }
        }
        else if(data && data.enddate){
            if(data.startdate) {
                this.setState({startDate: moment(data.startdate, "YYYYMMDD").toDate()});
            }

            if(data.enddate) {
                this.setState({endDate: moment(data.enddate, "YYYYMMDD").toDate()});
                this.setState({date: new Date(moment(data.enddate, "YYYYMMDD").add(1, 'day').format("YYYY-MM-DD"))});
            }
            else {
                this.setState({date: new Date()});
            }
        }
    }

    /**
     * 监听时间段数据变化
     * @param data
     */
    onTimebucketStoreChange(data) {
        console.log(data);
        this.setState({timebucketList: data});
    }

    /**
     * 监听素材数据变化
     * @param data
     */
    onMaterialStoreChange(data) {

        if(data.length > 0) {
            if(this.state.page == 1) {
                this.setState({materialList: data, isLastPage: false});
            }
            else {
                var materialList = this.state.materialList.concat(data);
                this.setState({materialList: materialList, isLastPage: false});
            }
        }
        else {
            this.setState({isLastPage: true});
        }
    }

    /**
     *
     * @param index
     */
    handleSelectMaterialItem(index) {
        var materialList = this.state.materialList;
        materialList[index].checked = !materialList[index].checked;
        this.setState({materialList: materialList});
    }

    /**
     * 加载更多素材
     */
    loadMoreMaterial() {
        if(!this.state.isLastPage) {
            var page = this.state.page + 1;
            this.setState({page: page});
            MaterialActions.fetch(this.state.terminalId, this.state.keyword, 'length|' + this.state.sort, page);
        }
    }


    onTimebucketChange(event) {
        this.setState({timebucketId: event.target.value});
    }

    /**
     * 监听设备选择列表变化
     * @param event
     */
    onTerminalChange(event) {
        var terminalId = event.target.value;
        this.setState({terminalId: terminalId}, function() {
            TerminalActions.getDateWithProgram(this.state.terminalId);
            this.initializeMaterialList();
        });
    }

    /**
     * 监听日期变化
     * @param event
     * @param date
     */
    onDateChange(event, date) {
        this.setState({date: date});
    }

    /**
     * 开始搜索
     */
    startSearch() {
        this.setState({searching: true});
    }

    /**
     * 取消搜索
     */
    cancelSearch() {
        this.setState({searching: false});
    }

    /**
     * 重置搜索条件
     */
    resetSearch() {
        this.setState({keyword: ''}, this.initializeMaterialList.bind(this));

    }

    /**
     * 监听搜索关键词变化
     * @param event
     */
    onKeywordChange(event) {
        var keyword = event.target.value;
        this.setState({keyword: keyword}, this.initializeMaterialList.bind(this));
    }

    /**
     * 监听排序参数变化
     */
    onSortChange() {
        var sort = '';
        if(this.state.sort == 'asc') {
            sort = 'desc';
        }
        else {
            sort = 'asc';
        }
        this.setState({sort: sort}, this.initializeMaterialList);
    }

    /**
     * 初始化素材列表
     */
    initializeMaterialList() {
        this.setState({materialList: [], page: 1, isLastPage: false}, function() {
            MaterialActions.fetch(this.state.terminalId, this.state.keyword, 'length|' + this.state.sort);
        });
    }


    /**
     * 把指定素材添加到选择队列尾部
     * @param material
     * @param quenue
     */
    pushMaterialToQuenue(material, quenue) {
        material = {productid: material.productid, length: material.length, contenttitle: material.contenttitle, imagepath: material.imagepath};

        var timebucketList = this.state.timebucketList;


        // 获取当前时段serialno
        if(quenue.length <= 0) {
            var currentSerialno = this.state.timebucketList[0].serialno;
        }
        else {
            var currentSerialno = quenue[quenue.length - 1].serialno;
        }

        // 获取对应的下标
        var index = 0;
        timebucketList.forEach((timebucket, i)=>{
            if(timebucket.serialno == currentSerialno) {
                index = i;
            }
        });

        while(index < timebucketList.length && !this.isMaterialFitForTimebucket(material, quenue, timebucketList[index])) {
            index += 1;
        }

        if(index >= timebucketList.length) {
            notification.show("节目长度超出所剩时长");
            return;
        }

        material.serialno = timebucketList[index].serialno;
        quenue.push(material);
    }

    /**
     * 重排所选素材队列
     * @param quenue
     */
    resortQuenue(quenue) {
        var newQuenue = [];
        quenue.forEach((material)=>{
            this.pushMaterialToQuenue(material, newQuenue);
        });
        return newQuenue;
    }

    /**
     * 选择素材
     * @param material
     */
    selectMaterial(material) {
        var selectedMaterialList = this.state.selectedMaterialList;
        this.pushMaterialToQuenue(material, selectedMaterialList);
        this.setState({selectedMaterialList: selectedMaterialList});
    }

    /**
     * 获取进度
     * @returns {number}
     */
    getProgress() {
        var selectedMaterialList = this.state.selectedMaterialList;
        var timebucketList = this.state.timebucketList;
        //console.log(timebucketList);
        //console.log(selectedMaterialList);
        /*** 计算时段总时长 ***/
        var totalDuration = 0;
        timebucketList.forEach((timebucket)=>{
            totalDuration += timebucket.valid;
        });

        /*** 计算已选素材所占时长 ***/
        var duration = 0;
        if(selectedMaterialList.length > 0) {
            var currentSerialno = selectedMaterialList[selectedMaterialList.length - 1].serialno;

            // 获取对应的下标
            var index = 0;
            timebucketList.forEach((timebucket, i)=>{
                if(timebucket.serialno == currentSerialno) {
                    index = i;
                }
            });

            if(index == 0) {
                selectedMaterialList.forEach((item)=>{
                    duration += parseInt(item.length);
                });
            }
            else {
                for(var i = 0; i < index; i++) {
                    duration += parseInt(timebucketList[i].valid);
                }

                selectedMaterialList.forEach((item)=>{
                    if(item.serialno == currentSerialno) {
                        duration += parseInt(item.length);
                    }
                });
            }
        }

        return (duration / totalDuration) * 100;
    }

    /**
     * 获取剩余时间
     * @returns {number}
     */
    getRemainDuration() {
        var timebucketList = this.state.timebucketList;

        /*** 计算时段总时长 ***/
        var totalDuration = 0;
        timebucketList.forEach((timebucket)=>{
            totalDuration += timebucket.valid;
        });

        var progress = this.getProgress();

        return totalDuration * (100 - progress)/100;
    }

    /**
     * 判断当前时段是否能容纳指定素材
     * @param material
     * @param quenue
     * @param timebucket
     * @returns {boolean}
     */
    isMaterialFitForTimebucket(material, quenue, timebucket) {
        var selectedMaterialList = quenue;

        var duration = parseInt(material.length);
        selectedMaterialList.forEach((item)=>{
            if(item.serialno == timebucket.serialno)
                duration += parseInt(item.length);
        });

        return duration <= timebucket.valid;
    }

    preview() {
        console.log('asdf');
        this.refs.preview.show();
    }

    onPreviewCompleted(materialList) {
        console.log(materialList);
        materialList = this.resortQuenue(materialList);
        console.log(materialList);
        this.setState({selectedMaterialList: materialList});
    }

    /**
     * 提交表单
     */
    onSubmit() {
        console.log(this.getRemainDuration() / 3600);
        if(this.getRemainDuration() / 3600 >= 1){
            notification.show("尚未完成,请继续");
            return;
        }

        var selectedMaterialList = this.state.selectedMaterialList;
        var timebucketList = this.state.timebucketList;

        var program = timebucketList.map((timebucket)=>{
            var sequence = selectedMaterialList
                .filter((material)=>{
                    return material.serialno == timebucket.serialno;
                })
                .map((material)=>{
                    return material.productid + "-" + material.length;
                }).join(",");

            return {
                serialno: timebucket.serialno,
                sequence: sequence
            };
        });

        ProgramActions.create(this.state.administration.administrationid, this.state.terminalId, program, moment(this.state.date).format("YYYYMMDD"));
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
        if(modifiers == 'disabled') {
            return;
        }
        this.setState({date: day});
        this.toggleDayPicker();
    }

    /**
     * 后一天
     */
    onNextDay() {
        var date = this.state.date;
        this.setState({date: moment(date).add(1, 'day').toDate()});
    }

    /**
     * 前一天
     */
    onPrevDay() {
        var date = this.state.date;
        this.setState({date: moment(date).subtract(1, 'day').toDate()});
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
        this.setState({isTerminalPickerOpen: false, terminalId: terminalid}, this.initializeMaterialList.bind(this));
    }

    render() {

        if(this.state.materialList && this.state.materialList.length > 0) {
            var materialList = this.state.materialList.map((material, index)=>{
                var num = this.state.selectedMaterialList.filter((item)=>{
                    return item.productid == material.productid;
                }).length;

                return (
                    <li key={"material-" + index} onClick={this.selectMaterial.bind(this, material)}>
                        <div className="left" style={{backgroundImage: 'url(' + 'http://106.38.138.99:8080/bms/public/' + material.imagepath + ')'}}>
                        </div>
                        <div className="right">
                            <p className="title">{material.contenttitle}</p>
                            <p className="meta">
                                <span className="duration"><Icon name="clock-o"/> {Math.ceil(material.length / 60)}分钟</span>
                                {num > 0 ? <span className="num">{num}</span> : ''}
                            </p>
                        </div>
                    </li>
                );
            });
        }
        else {
            var materialList = (
                <p style={{textAlign: 'center'}}></p>
            );
        }


        let self = this;
        const modifiers = {
            selected: function(day) {
                return DateUtils.isSameDay(day, self.state.date);
            },
            disabled: function(day) {
                return moment(day).subtract(1, 'day').toDate() <= self.state.endDate && day >= self.state.startDate;
            }
        };

        if(this.state.loaded) {
            var terminalList = this.state.terminalList;
            var terminalId   = this.state.terminalId;
            var terminalName = '';
            terminalList.forEach((terminal)=>{
                if(terminal.terminalid == terminalId) {
                    terminalName = terminal.name;
                }
            });

            return (
                <div className="program-edit-page">

                    <NavBar
                        mainText={terminalName}
                        mainIcon={<Icon name="angle-down" />}
                        leftText="取消"
                        rightText="提交"
                        onLeftClick={()=>{window.location.hash = '#/program/list'}}
                        onMainClick={this.toggleTerminalPicker.bind(this)}
                        onRightClick={this.onSubmit.bind(this)} />


                    <div className="date">
                        <div className="left">

                        </div>

                        <div className="middle" onClick={this.toggleDayPicker.bind(this)}>
                            {moment(this.state.date).format("YYYY-MM-DD")}
                        <span className="icon">
                            <Icon name="angle-down" />
                        </span>
                        </div>

                        <div className="right">

                        </div>
                    </div>

                    <div className={"date-picker-dialog" + (this.state.isDatePickerOpen ? "" : " hidden")}>
                        <div className="wrapper">
                            <DayPicker localeUtils={LocaleUtils} locale="zh-cn" modifiers={modifiers} onDayClick={this.onDayPick.bind(this)} />
                        </div>
                    </div>

                    <div className="progress">
                        <p style={{textAlign: 'center'}}>当天添加视频进度已完成{this.getProgress().toFixed(2)}%</p>
                        <ProgressBar value={this.getProgress.bind(this)()} label={this.state.selectedMaterialList.length} onClick={this.preview.bind(this)} />
                    </div>

                    <div className="filter">
                        <div className={"toolbar" + (this.state.searching ? ' hidden' : '')}>

                            <p onClick={this.onSortChange.bind(this)}><span className="txt">时长</span> <Icon className="icon" name="sort" /></p>

                            <p onClick={this.startSearch.bind(this)}><Icon className="icon" name="search" /></p>
                        </div>

                        <div className={"search" + (this.state.searching ? '' : ' hidden')}>
                            <div className="left">
                                <Icon className="search-icon" name="search"/>
                                <input type="text" placeholder="搜索您想要的节目" value={this.state.keyword} onChange={this.onKeywordChange.bind(this)} />
                                <Icon className="clear-icon" name="close" onClick={this.resetSearch.bind(this)} />
                            </div>
                            <div className="right" onClick={this.cancelSearch.bind(this)}>取消</div>
                        </div>
                    </div>


                    <ul className="material-list">
                        {materialList}
                    </ul>

                    <div className={"load-more" + (this.state.materialList && this.state.materialList.length >= 5 ? '' : ' hidden')}>
                        <button className="btn-load-more" onClick={this.loadMoreMaterial.bind(this)}>{this.state.isLastPage ? "没有素材啦" : "加载更多"}</button>
                    </div>

                    <TerminalPicker
                        open={this.state.isTerminalPickerOpen}
                        value={this.state.terminalId}
                        terminalList={this.state.terminalList}
                        onPick={this.onTerminalPick.bind(this)}
                        onCancel={()=>{this.setState({isTerminalPickerOpen: false})}} />

                    <ProgramPreview previewList={this.state.selectedMaterialList} onCompleted={this.onPreviewCompleted.bind(this)} ref="preview"/>
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