import React from 'react';
import Icon from 'react-fa';
import {List, ListItem, ListDivider, RaisedButton} from 'material-ui';
import './styles/index.less';

export default class index extends React.Component {
    render() {
        return (
            <div className="ad-index-page">
                <List subheader="机构归属地信息">
                    <ListItem primaryText="省份" secondaryText="北京" leftIcon={<Icon name="bars" />} disabled={true} />
                    <ListDivider inset={true} />
                    <ListItem primaryText="市/地区" secondaryText="北京" leftIcon={<Icon name="bars" />} disabled={true} />
                    <ListDivider inset={true} />
                    <ListItem primaryText="详细地址" secondaryText="西土城路10号" leftIcon={<Icon name="bars" />} disabled={true} />
                </List>
                <ListDivider />
                <List subheader="机构管理员信息">
                    <ListItem primaryText="电话号码" secondaryText="13717981488" leftIcon={<Icon name="phone" />} disabled={true} />
                    <ListDivider inset={true} />
                    <ListItem primaryText="邮箱" secondaryText="tsyeyuanfeng@126.com" leftIcon={<Icon name="send" />} disabled={true} />
                </List>

                <RaisedButton style={{width: '90%', margin: '2rem 5%', textAlign: 'center'}} backgroundColor="#d9534f" labelColor="#fff" label="退出登录" linkButton={true} href="#login" />
            </div>
        );
    }
}