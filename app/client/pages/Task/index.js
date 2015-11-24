import React from 'react';
import Icon from 'react-fa';
import {List, ListItem, ListDivider, RaisedButton} from 'material-ui';
import './styles/index.less';
import '../../styles/page.less';

export default class index extends React.Component {
    render() {
        return (
            <div className="task-index-page page">
                <h2 className="title">
                    消息列表
                </h2>
                <List>
                    <ListItem primaryText="任务1" secondaryText="您有一台设备离线，请及时处理。" leftIcon={<Icon name="bars" />} disabled={true} />
                    <ListDivider inset={true} />
                    <ListItem primaryText="任务2" secondaryText="您的设备【设备编号】节目单不全，请及时制作节目。" leftIcon={<Icon name="bars" />} disabled={true} />
                    <ListDivider inset={true} />
                    <ListItem primaryText="任务3" secondaryText="您的机构信息不完善，请及时完善机构信息。" leftIcon={<Icon name="bars" />} disabled={true} />
                    <ListDivider inset={true} />
                    <ListItem primaryText="任务4" secondaryText="连续签到，送惊喜大礼！" leftIcon={<Icon name="bars" />} disabled={true} />
                    <ListDivider inset={true} />
                    <ListItem primaryText="任务5" secondaryText="您的设备[设备编号]今天的节目单有更新，请及时推送。" leftIcon={<Icon name="bars" />} disabled={true} />
                </List>
            </div>
        );
    }
}