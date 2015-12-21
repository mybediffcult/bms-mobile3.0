import React from 'react';
import Icon from 'react-fa';
import moment from 'moment';
import {SelectField, List, ListItem, ListDivider, RaisedButton, FlatButton, Avatar, Checkbox, DatePicker, DatePickerDialog, LinearProgress, Badge} from 'material-ui';
import request from 'superagent';
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
            date: null,
            terminalId: null,
            timebucketId: '',
            timebucketList: [

            ],
            terminalList: [],
            materialList: []
        };
    }

    componentWillMount() {
        this.administration = JSON.parse(window.localStorage.getItem('administration'));

        this.unsubscribeTerminalStore = TerminalStore.listen(this.onTerminalStoreChange.bind(this));
        this.unsubscribeTimebucketStore = TimebucketStore.listen(this.onTimebucketStoreChange.bind(this));
        this.unsubscribeMaterialStore = MaterialStore.listen(this.onMaterialStoreChange.bind(this));

        TerminalActions.fetchAll(this.administration.administrationid);

        //TimebucketActions.fetch(this.administration.administrationid);
        //MaterialActions.fetch(this.props.params.tid);
    }

    componentWillUnmount() {
        this.unsubscribeTerminalStore();
        this.unsubscribeTimebucketStore();
        this.unsubscribeMaterialStore();
    }

    formatDate(date) {
        return moment(date).format("YYYY-MM-DD");
    }

    onTerminalStoreChange(data) {
        console.log(data);
        if(data instanceof Array) {
            console.log(data);
            this.setState({terminalList: data});
            if(!this.state.terminalId) {
                this.setState({terminalId: this.state.terminalList[0].terminalid});
                TerminalActions.getDateWithProgram(this.state.terminalId);
            }
        }
        else if(data && data.enddate){
            this.setState({date: new Date(moment(data.enddate, "YYYYMMDD").add(1, 'day').format("YYYY-MM-DD"))});
        }
    }

    onTimebucketStoreChange(data) {
        this.setState({timebucketList: data});
    }

    onMaterialStoreChange(data) {
        var materialList = data.map((item)=>{
            item.checked = false;
            return item;
        });
        this.setState({materialList: materialList});
    }

    handleSelectMaterialItem(index) {
        var materialList = this.state.materialList;
        materialList[index].checked = !materialList[index].checked;
        this.setState({materialList: materialList});
    }

    loadMoreMaterial() {
        var materialList = this.state.materialList;
        materialList.push({
            name: '火灾爆炸事件',
            length: '30',
            thumb: 'http://lorempixel.com/100/100/nature/',
            checked: false
        });

        materialList.push({
            name: '火灾爆炸事件',
            length: '30',
            thumb: 'http://lorempixel.com/100/100/nature/',
            checked: false
        });

        materialList.push({
            name: '火灾爆炸事件',
            length: '30',
            thumb: 'http://lorempixel.com/100/100/nature/',
            checked: false
        });

        this.setState({materialList: materialList});
    }

    onTimebucketChange(event) {
        this.setState({timebucketId: event.target.value});
    }

    onSubmit() {
        if(!this.state.timebucketId) {
            notification.show('请选择时段');
            return;
        }

        var materialList = this.state.materialList.filter((material)=>{
            return material.checked;
        });

        if(!materialList || materialList.length <= 0) {
            notification.show('请选择素材');
            return;
        }


        var sequence = materialList.map((material)=>{
            return material.productid + '-' + material.length;
        }).join(',');

        ProgramActions.create(this.administration.administrationid, this.props.params.tid, this.state.timebucketId, sequence);
    }

    onTerminalChange(event) {
        this.setState({terminalId: event.target.value});
        TerminalActions.getDateWithProgram(this.state.terminalId);
    }

    onDateChange(event, date) {
        this.setState({date: date});
    }

    startSearch() {
        this.setState({searching: true});
    }

    cancelSearch() {
        this.setState({searching: false});
    }

    onKeywordChange(event) {
        this.setState({keyword: event.target.value});
    }

    render() {

        var materialList = this.state.materialList.map((material, index)=>{
            return (
                <ListItem
                    key={"m_" + index}
                    primaryText={material.contenttitle}
                    leftAvatar={<Avatar src={'http://106.38.138.61:8088/bms/public/' + material.imagepath} />}
                    rightIcon={material.checked ? <Icon style={{color: '#00bcd4'}} name="check-square-o" /> : <Icon name="square-o" />}
                    onTouchTap={this.handleSelectMaterialItem.bind(this, index)} />
            );
        });

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



                <Badge style={{display: 'block', margin: '0.5rem'}} badgeContent={5} secondary={true}>
                    <LinearProgress mode="determinate" value={50} />
                </Badge>

                <div className="filter-area" style={{display: this.state.searching?"none":"block"}}>
                    <select style={{width: '3.6rem', height: '2rem', margin: '0 0.5rem 0 0', border: '1px solid #eee', outline: 'none', borderRadius: 'none', fontSize: '0.8rem'}}>
                        <option>区域</option>
                        <option>设备1</option>
                        <option>设备1</option>
                    </select>
                    <select style={{width: '3.6rem', height: '2rem', margin: '0 0.5rem', border: '1px solid #eee', outline: 'none', borderRadius: 'none', fontSize: '0.8rem'}}>
                        <option>内容</option>
                        <option>设备1</option>
                        <option>设备1</option>
                    </select>
                    <span className="time">
                        时长 <Icon name="caret-down" />
                    </span>

                    <Icon className="search" name="search" onClick={this.startSearch.bind(this)} />
                </div>

                <div className="search-area" style={{display: this.state.searching?"":"none"}}>
                    <input type="text" className="input-search" value={this.state.keyword} onChange={this.onKeywordChange.bind(this)} />
                    <button className="cancel" onClick={this.cancelSearch.bind(this)}>取消</button>
                </div>


                <ul className="material-list">
                    <li>
                        <span className="left"><img className="thumb" src="http://lorempixel.com/200/200/nature/" /></span>
                        <div className="right">
                            <div className="duration">时长:</div>
                            <div className="name">
                                <span className="txt">节目名称</span>
                                <button className="btn-add"><Icon name="plus" /></button>
                            </div>
                        </div>
                    </li>

                    <li>
                        <span className="left"><img className="thumb" src="http://lorempixel.com/200/200/nature/" /></span>
                        <div className="right">
                            <div className="duration">时长:</div>
                            <div className="name">
                                <span className="txt">节目名称</span>
                                <button className="btn-add"><Icon name="plus" /></button>
                            </div>
                        </div>
                    </li>

                    <li>
                        <span className="left"><img className="thumb" src="http://lorempixel.com/200/200/nature/" /></span>
                        <div className="right">
                            <div className="duration">时长:</div>
                            <div className="name">
                                <span className="txt">节目名称</span>
                                <button className="btn-add"><Icon name="plus" /></button>
                            </div>
                        </div>
                    </li>

                    <li>
                        <span className="left"><img className="thumb" src="http://lorempixel.com/200/200/nature/" /></span>
                        <div className="right">
                            <div className="duration">时长:</div>
                            <div className="name">
                                <span className="txt">节目名称</span>
                                <button className="btn-add"><Icon name="plus" /></button>
                            </div>
                        </div>
                    </li>

                    <li>
                        <span className="left"><img className="thumb" src="http://lorempixel.com/200/200/nature/" /></span>
                        <div className="right">
                            <div className="duration">时长:</div>
                            <div className="name">
                                <span className="txt">节目名称</span>
                                <button className="btn-add"><Icon name="plus" /></button>
                            </div>
                        </div>
                    </li>
                </ul>


                <form>

                    <RaisedButton style={{marginTop: '2rem'}} label="提交" secondary={true} fullWidth={true} onClick={this.onSubmit.bind(this)} />
                </form>
            </div>
        );
    }
}