import React from 'react';
import Icon from 'react-fa';
import {List, ListItem, ListDivider, RaisedButton, Avatar} from 'material-ui';
import '../../styles/page.less';

export default class list extends React.Component {
    render() {
        return (
            <div className="program-list-page page bg-white">
                <h2 className="title">
                    <a href="/terminal/list">返回</a>
                    设备节目单
                </h2>
                <p className="subtitle">北京市海淀区神舟大厦-测</p>
                <List subheader="08:00-10:00(全国时段)">
                    <ListItem primaryText="火灾爆炸事件(30分钟)" leftAvatar={<Avatar src="http://lorempixel.com/100/100/nature/" />} />
                    <ListDivider inset={true} />
                    <ListItem primaryText="火灾爆炸事件(30分钟)" leftAvatar={<Avatar src="http://lorempixel.com/100/100/nature/" />} />
                    <ListDivider inset={true} />
                    <ListItem primaryText="火灾爆炸事件(30分钟)" leftAvatar={<Avatar src="http://lorempixel.com/100/100/nature/" />} />
                </List>
                <ListDivider />
                <List subheader="08:00-10:00(全国时段)">
                    <ListItem primaryText="火灾爆炸事件(30分钟)" leftAvatar={<Avatar src="http://lorempixel.com/100/100/nature/" />} />
                    <ListDivider inset={true} />
                    <ListItem primaryText="火灾爆炸事件(30分钟)" leftAvatar={<Avatar src="http://lorempixel.com/100/100/nature/" />} />
                    <ListDivider inset={true} />
                    <ListItem primaryText="火灾爆炸事件(30分钟)" leftAvatar={<Avatar src="http://lorempixel.com/100/100/nature/" />} />
                </List>

            </div>
        );
    }
}