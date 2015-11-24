import React from 'react';
import Icon from 'react-fa';
import {List, ListItem, ListDivider, RaisedButton} from 'material-ui';
import './styles/index.less';
import '../../styles/page.less';

export default class index extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            administration: {}
        };
    }

    logout() {
        window.localStorage.removeItem('isLogin');
        window.localStorage.removeItem('administration');
        window.location.hash = '#/login';
    }

    componentWillMount() {
        this.setState({loading: false, administration: JSON.parse(window.localStorage.getItem('administration'))});
    }

    render() {
        if(!this.state.loading)
        return (
            <div className="ad-index-page page">
                <h2 className="title">
                    机构信息
                </h2>

                <List subheader="机构归属地信息">
                    <ListItem primaryText="省份" secondaryText={this.state.administration.province} leftIcon={<Icon name="bars" />} disabled={true} />
                    <ListDivider inset={true} />
                    <ListItem primaryText="市/地区" secondaryText={this.state.administration.city} leftIcon={<Icon name="bars" />} disabled={true} />
                    <ListDivider inset={true} />
                    <ListItem primaryText="详细地址" secondaryText={this.state.administration.address} leftIcon={<Icon name="bars" />} disabled={true} />
                </List>
                <ListDivider />
                <List subheader="机构管理员信息">
                    <ListItem primaryText="电话号码" secondaryText={this.state.administration.telephone} leftIcon={<Icon name="phone" />} disabled={true} />
                    <ListDivider inset={true} />
                    <ListItem primaryText="邮箱" secondaryText={this.state.administration.email ? this.state.administration.email : '无'} leftIcon={<Icon name="send" />} disabled={true} />
                </List>

                <RaisedButton style={{width: '90%', margin: '2rem 5%', textAlign: 'center'}} backgroundColor="#d9534f" labelColor="#fff" label="退出登录" onClick={this.logout.bind(this)} />
            </div>
        );
        else
        return (
            <div className="blank-page"></div>
        );
    }
}