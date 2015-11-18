import React from 'react';
import Icon from 'react-fa';
import {List, ListItem, ListDivider, RaisedButton} from 'material-ui';
import './styles/index.less';

export default class index extends React.Component {
    render() {
        return (
            <div className="task-index-page">
                <List>
                    <ListItem primaryText="推送节目" secondaryText="明天推送饮水健康节目" leftIcon={<Icon name="bars" />} disabled={true} />
                    <ListDivider inset={true} />
                    <ListItem primaryText="推送节目" secondaryText="明天推送饮水健康节目" leftIcon={<Icon name="bars" />} disabled={true} />
                    <ListDivider inset={true} />
                    <ListItem primaryText="推送节目" secondaryText="明天推送饮水健康节目" leftIcon={<Icon name="bars" />} disabled={true} />
                    <ListDivider inset={true} />
                    <ListItem primaryText="推送节目" secondaryText="明天推送饮水健康节目" leftIcon={<Icon name="bars" />} disabled={true} />
                    <ListDivider inset={true} />
                    <ListItem primaryText="推送节目" secondaryText="明天推送饮水健康节目" leftIcon={<Icon name="bars" />} disabled={true} />
                    <ListDivider inset={true} />
                    <ListItem primaryText="推送节目" secondaryText="明天推送饮水健康节目" leftIcon={<Icon name="bars" />} disabled={true} />
                    <ListDivider inset={true} />
                    <ListItem primaryText="推送节目" secondaryText="明天推送饮水健康节目" leftIcon={<Icon name="bars" />} disabled={true} />
                </List>
            </div>
        );
    }
}