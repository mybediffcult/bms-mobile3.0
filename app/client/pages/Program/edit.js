import React from 'react';
import Icon from 'react-fa';
import {SelectField, List, ListItem, ListDivider, RaisedButton, Avatar, Checkbox} from 'material-ui';
import '../../styles/page.less';
import './styles/edit.less';

export default class edit extends React.Component {
    constructor() {
        super();
        this.state = {
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

    render() {

        var materialList = this.state.materialList.map((material, index)=>{
            return (
                <ListItem
                    key={"m_" + index}
                    primaryText={material.name}
                    leftAvatar={<Avatar src={material.thumb} />}
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
                        valueMember="id"
                        displayMember="name"
                        value=""
                        menuItems={[{id: 1, name: '广西'}, {id: 2, name: '广东'}, {id: 3, name: '北京'}]} />

                    <div className="material-list">
                        <List subheader="选择素材">
                            {materialList}
                        </List>
                        <RaisedButton style={{width: '90%', margin: '1rem 5%'}} label="更多" onClick={this.loadMoreMaterial.bind(this)} />
                    </div>

                    <RaisedButton style={{marginTop: '2rem'}} label="提交" secondary={true} fullWidth={true} />
                </form>
            </div>
        );
    }
}