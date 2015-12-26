import React from 'react';
import Icon from 'react-fa';
import NavBar from '../../components/NavBar';
import Navigation from '../../components/Navigation';

import {Dialog,RaisedButton} from 'material-ui';
import './styles/index.less';
import '../../styles/page.less';

export default class index extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            administration: {
                province: '北京',
                city: '北京',
                address: '海淀区西土城路10号',
                telephone: '13717981488',
                email: 'tsyeyuanfeng@126.com'
            },
            open: false
        };
    }

    logout() {
        window.localStorage.removeItem('isLogin');
        window.localStorage.removeItem('administration');
        window.location.hash = '#/user/login';
    }


    onCancel(event) {
        this.setState({open:false});
    }

    openDialog(event){
        this.setState({open:true});
    }

    render() {
        console.log(this.state.administration);
        if(!this.state.loading)
        return (
            <div className="user-index-page">
                <NavBar mainText="用户" />

                <div className="user-info">
                    <article className="info-box border">
                        <header className="header">
                            <span className="icon"><Icon name="map-marker" /></span>
                            <span className="title">机构归属地信息</span>
                        </header>

                        <ul className="info-item-list">
                            <li>
                                <label className="label">省份</label>
                                <span className="content">北京</span>
                            </li>

                            <li>
                                <label className="label">市/地区</label>
                                <span className="content">北京</span>
                            </li>

                            <li>
                                <label className="label">详细地址</label>
                                <span className="content">北京市西城区人民大学西直门附属医院</span>
                            </li>
                        </ul>
                    </article>

                    <article className="info-box">
                        <header className="header">
                            <span className="icon"><Icon name="user" /></span>
                            <span className="title">机构管理员信息</span>
                        </header>

                        <ul className="info-item-list">
                            <li>
                                <label className="label">手机号码</label>
                                <span className="content">13717981488</span>
                            </li>

                            <li>
                                <label className="label">电子邮箱</label>
                                <span className="content">tsyeyuanfeng@126.com</span>
                            </li>
                        </ul>
                    </article>
                </div>


                <div className="cell-box">
                    <div className="cell authorize">
                        <span className="left">节目单委托管理</span>
                        <span className="right">
                            <button className="btn-authorize">委托</button>
                        </span>
                    </div>
                </div>

                <div className="cell-box">
                    <a className="cell maintain" href="javascript:;">
                        <span className="left">一键保修</span>
                        <span className="right">
                            <Icon name="chevron-right" />
                        </span>
                    </a>
                    <a className="customer_service" href="tel:4008010133">客服电话&nbsp;&nbsp;&nbsp;&nbsp;4008010133</a>
                </div>

                <div className="logout">
                    <button className="btn-logout" onClick={this.logout.bind(this)}>退出登录</button>
                </div>

                <Navigation/>
            </div>
        );
        else
        return (
            <div className="blank-page"></div>
        );
    }
}