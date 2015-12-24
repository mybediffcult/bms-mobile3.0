import React from 'react';
import Icon from 'react-fa';
import moment from 'moment';
import {SelectField, List, ListItem, ListDivider, RaisedButton, FlatButton, Avatar, Checkbox, DatePicker, DatePickerDialog, LinearProgress, Badge} from 'material-ui';
import request from 'superagent';
import ProgramPreview from '../../components/ProgramPreview';
import Notification from '../../mixins/Notification';

import TerminalActions from '../../actions/Terminal';
import ProgramActions from '../../actions/Program';
import TimebucketActions from '../../actions/Timebucket';
import MaterialActions from '../../actions/Material';

import TerminalStore from '../../stores/Terminal';
import TimebucketStore from '../../stores/Timebucket';
import MaterialStore from '../../stores/Material';

import '../../styles/page.less';
import './styles/edit.less';

var notification = new Notification();

export default class edit extends React.Component {
    constructor() {
        super();
        this.state = {
            searching: false,
            keyword: '',
            sort: 'desc',
            page: 1,
            isLastPage: false,
            date: null,
            terminalId: null,
            progress: 0,
            terminalList: [],
            materialList: [],
            timebucketList: [],
            selectedMaterialList: []
        };
    }

    componentWillMount() {
        this.administration = JSON.parse(window.localStorage.getItem('administration'));
        this.unsubscribeTerminalStore = TerminalStore.listen(this.onTerminalStoreChange.bind(this));
        this.unsubscribeTimebucketStore = TimebucketStore.listen(this.onTimebucketStoreChange.bind(this));
        this.unsubscribeMaterialStore = MaterialStore.listen(this.onMaterialStoreChange.bind(this));

        TerminalActions.fetchAll(this.administration.administrationid);
        TimebucketActions.fetch(this.administration.administrationid);
    }

    componentWillUnmount() {
        this.unsubscribeTerminalStore();
        this.unsubscribeTimebucketStore();
        this.unsubscribeMaterialStore();
    }

    /**
     * 格式化日期
     * @param date
     * @returns {*}
     */
    formatDate(date) {
        return moment(date).format("YYYY-MM-DD");
    }

    /**
     * 监听设备数据变化
     * @param data
     */
    onTerminalStoreChange(data) {
        if(data instanceof Array) {
            this.setState({terminalList: data});
            if(!this.state.terminalId) {
                this.setState({terminalId: this.state.terminalList[0].terminalid}, function() {
                    TerminalActions.getDateWithProgram(this.state.terminalId);
                    MaterialActions.fetch(this.state.terminalId, this.state.keyword, 'length|' + this.state.sort);
                });
            }
        }
        else if(data && data.enddate){
            this.setState({date: new Date(moment(data.enddate, "YYYYMMDD").add(1, 'day').format("YYYY-MM-DD"))});
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
        var index = timebucketList.findIndex((timebucket)=>{
            return timebucket.serialno == currentSerialno;
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
            var index = timebucketList.findIndex((timebucket)=>{
                return timebucket.serialno == currentSerialno;
            });

            if(index == 0) {
                selectedMaterialList.forEach((item)=>{
                    duration += item.length;
                });
            }
            else {
                for(var i = 0; i < index; i++) {
                    duration += timebucketList[i].valid;
                }

                selectedMaterialList.forEach((item)=>{
                    if(item.serialno == currentSerialno) {
                        duration += item.length;
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

        var duration = material.length;
        selectedMaterialList.forEach((item)=>{
            if(item.serialno == timebucket.serialno)
                duration += item.length;
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

        console.log(program);

        ProgramActions.create(this.administration.administrationid, this.state.terminalId, program);
    }



    render() {

        if(this.state.materialList && this.state.materialList.length > 0) {
            var materialList = this.state.materialList.map((material, index)=>{
                var num = this.state.selectedMaterialList.filter((item)=>{
                    return item.productid == material.productid;
                }).length;

                return (
                    <li key={"material-" + index}>
                        <span className="left"><img className="thumb" src={'http://106.38.138.99:8080/bms/public/' + material.imagepath} /></span>
                        <div className="right">
                            <div className="headline">
                                <span className="duration">时长:{Math.ceil(material.length / 60)}分钟</span>
                                <span className="num">{num ? num : ''}</span>
                            </div>
                            <div className="name">
                                <span className="txt">{material.contenttitle}</span>

                                <button className="btn-add" onClick={this.selectMaterial.bind(this, material)}><Icon name="plus" /></button>
                            </div>
                        </div>
                    </li>
                );
            });
        }
        else {
            var materialList = (
                <p style={{textAlign: 'center'}}>该设备查询不到素材</p>
            );
        }


        var terminalList = this.state.terminalList.map((terminal, index)=>{
            return (
                <option key={"terminal-"+terminal.terminalid} value={terminal.terminalid}>{terminal.name}</option>
            );
        });

        return (
            <div className="program-edit-page">

                <h2 className="title">
                    <a className="left" href="#terminal/list">返回</a>
                    <DatePicker
                        value={this.state.date}
                        onChange={this.onDateChange.bind(this)}
                        formatDate={this.formatDate.bind(this)}
                        style={{textAlign: 'center', width: '86px', margin: '0 auto', color: "#eee"}}
                        textFieldStyle={{width: "86px", color: "#eee"}}
                        autoOk={true} />
                    <select
                        value={this.state.terminalId}
                        onChange={this.onTerminalChange.bind(this)}
                        style={{position: 'absolute', right:'0.5rem', top: '1rem', width: '86px', height: '2rem', border: '1px solid transparent', outline: 'none', borderRadius: 'none'}}>
                        {terminalList}
                    </select>
                </h2>


                <Badge style={{display: 'block', margin: '0.5rem'}} badgeContent={this.state.selectedMaterialList.length} secondary={true}>
                    <LinearProgress mode="determinate" value={this.getProgress.bind(this)()} onClick={this.preview.bind(this)} />
                </Badge>

                <div className="filter-area" style={{display: this.state.searching?"none":"block"}}>
                    <select style={{width: '3.6rem', height: '2rem', margin: '0 0.5rem 0 0', border: '1px solid #eee', outline: 'none', borderRadius: 'none', fontSize: '0.8rem'}}>
                        <option>区域</option>
                        <option>全国</option>
                        <option>北京</option>
                    </select>
                    <select style={{width: '3.6rem', height: '2rem', margin: '0 0.5rem', border: '1px solid #eee', outline: 'none', borderRadius: 'none', fontSize: '0.8rem'}}>
                        <option>内容</option>
                        <option>健康</option>
                        <option>保健</option>
                    </select>
                    <span className="time" onClick={this.onSortChange.bind(this)}>
                        时长 <Icon name={this.state.sort == 'asc' ? "caret-up" : "caret-down" } />
                    </span>

                    <Icon className="search" name="search" onClick={this.startSearch.bind(this)} />
                </div>

                <div className="search-area" style={{display: this.state.searching?"":"none"}}>
                    <input type="text" className="input-search" value={this.state.keyword} onChange={this.onKeywordChange.bind(this)} />
                    <button className="cancel" onClick={this.cancelSearch.bind(this)}>取消</button>
                </div>


                <ul className="material-list">
                    {materialList}
                </ul>

                <div style={{display: this.state.materialList && this.state.materialList.length >= 5 ? 'block' : 'none', width: "100%", boxSizing: "border-box", padding: "0 1.2rem"}}>
                    <FlatButton style={{width: "100%"}} label={this.state.isLastPage ? "没有素材啦" : "加载更多"} onClick={this.loadMoreMaterial.bind(this)} />
                </div>

                <form>

                    <RaisedButton style={{marginTop: '2rem'}} label="提交" secondary={true} fullWidth={true} onClick={this.onSubmit.bind(this)} />
                </form>

                <ProgramPreview previewList={this.state.selectedMaterialList} onCompleted={this.onPreviewCompleted.bind(this)} ref="preview"/>
            </div>
        );
    }
}