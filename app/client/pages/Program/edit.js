import React from 'react';
import Icon from 'react-fa';
import {SelectField, List, ListItem, ListDivider, RaisedButton, Avatar, Checkbox} from 'material-ui';
import request from 'superagent';
import Notification from '../../mixins/Notification';

import ProgramActions from '../../actions/Program';
import TimebucketActions from '../../actions/Timebucket';
import MaterialActions from '../../actions/Material';
import TimebucketStore from '../../stores/Timebucket';
import MaterialStore from '../../stores/Material';

import '../../styles/page.less';
import './styles/edit.less';

var notification = new Notification();

export default class edit extends React.Component {
    constructor() {
        super();
        this.state = {
            timebucketId: '',
            timebucketList: [

            ],
            materialList: [
                {
                    name: '火灾爆炸事件',
                    length: '30',
                    thumb: 'http://lorempixel.com/100/100/nature/',
                    checked: false
                },
                {
                    name: '火灾爆炸事件',
                    length: '30',
                    thumb: 'http://lorempixel.com/100/100/nature/',
                    checked: false
                },
                {
                    name: '火灾爆炸事件',
                    length: '30',
                    thumb: 'http://lorempixel.com/100/100/nature/',
                    checked: false
                }
            ]
        };
    }

    componentWillMount() {
        this.administration = JSON.parse(window.localStorage.getItem('administration'));
        this.unsubscribeTimebucketStore = TimebucketStore.listen(this.onTimebucketStoreChange.bind(this));
        this.unsubscribeMaterialStore = MaterialStore.listen(this.onMaterialStoreChange.bind(this));

        TimebucketActions.fetch('7aa8da96de72eeeee95a72f4701382ac');
        MaterialActions.fetch(this.props.params.tid);
    }

    componentWillUnMount() {
        this.unsubscribeTimebucketStore();
        this.unsubscribeMaterialStore();
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

        return (
            <div className="program-edit-page page bg-white">
                <h2 className="title">
                    <a className="left" href="#terminal/list">返回</a>
                    创建节目单
                </h2>
                <p className="subtitle">北京市海淀区神舟大厦-测</p>

                <form>
                    <SelectField
                        floatingLabelText="选择时段"
                        fullWidth={true}
                        valueMember="serialno"
                        displayMember="timebucket"
                        value={this.state.timebucketId}
                        onChange={this.onTimebucketChange.bind(this)}
                        menuItems={this.state.timebucketList} />

                    <div className="material-list">
                        <List subheader="选择素材">
                            {materialList}
                        </List>
                    </div>

                    <RaisedButton style={{marginTop: '2rem'}} label="提交" secondary={true} fullWidth={true} onClick={this.onSubmit.bind(this)} />
                </form>
            </div>
        );
    }
}