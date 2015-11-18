import React from 'react';
import Icon from 'react-fa';
import {SelectField, List, ListItem, ListDivider, RaisedButton, Avatar, Checkbox} from 'material-ui';
import request from 'superagent';
import Notification from '../../mixins/Notification';
import '../../styles/page.less';
import './styles/edit.less';

var notification = new Notification();

export default class edit extends React.Component {
    constructor() {
        super();
        this.state = {
            administration: null,
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
        //检查登录状态
        var ad = window.localStorage.getItem('administration');
        if(!ad) {
            notification.show('未登录', function() {
                window.location.hash = '#/login';
            });
        }
        else {
            this.setState({administration: JSON.parse(ad)});

            request.get('http://106.38.138.61:3000/api/terminal/' + this.props.params.tid + '/content').end((error, res)=>{
                var result = res.body;

                if(result.status == 200) {
                    var data = result.data;
                    var materialList = data.map((item)=>{
                        item.checked = false;
                        return item;
                    });
                    console.log(materialList);
                    this.setState({materialList: materialList});
                }
            });

            request.get('http://106.38.138.61:3000/api/administration/7aa8da96de72eeeee95a72f4701382ac/timebuckets').end((error, res)=>{
                var result = res.body;

                if(result.status == 200) {
                    var data = result.data;
                    this.setState({timebucketList: data});
                }
            })
        }
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

        request
            .put('http://106.38.138.61:3000/api/administration/' + this.state.administration.administrationid + '/terminal/' + this.props.params.tid + '/timeBucket/' + this.state.timebucketId + '/program')
            .send({
                sequence: sequence
            }).end((error, res)=>{
                var result = res.body;
                if(result.status == 200) {
                    notification.show('节目单创建成功', function() {
                        window.location.hash = '#/terminal/list';
                    });
                }
                else {
                    notification.show(result.message);
                }
            })
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
                    <a href="#terminal/list">返回</a>
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