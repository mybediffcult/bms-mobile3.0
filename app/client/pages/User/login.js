import React from 'react';
import request from 'superagent';
import md5 from 'md5';
import Notification from '../../mixins/Notification';

import NavBar from '../../components/NavBar';

import UserActions from '../../actions/User';

import '../../styles/form.less';
import './styles/login.less';

var notification = new Notification();

export default class login extends React.Component {
    constructor() {
        super();
        this.state = {
            phone: '',
            password: ''
        };
    }

    handleLogin() {
        if(!this.state.phone) {
            notification.show('请填写登录手机号');
            return;
        }
        if(!this.state.password) {
            notification.show('请填写登录密码');
            return;
        }

        UserActions.login(this.state.phone, md5(this.state.password));
    }

    /**
     * 表单项改变
     * @param field
     * @param event
     */
    onFieldChange(field, event) {
        var state = this.state;
        state[field] = event.target.value;
        this.setState(state);
    }

    render() {
        return (
            <div className="user-login-page">
                <NavBar/>
                <form className="login-form">
                    <div className="form-control">
                        <input type="text" placeholder="用户名(预留手机号)" value={this.state.phone} onChange={this.onFieldChange.bind(this, 'phone')} />
                    </div>

                    <div className="form-control">
                        <input type="password" placeholder="密码(手机号后六位)" value={this.state.password} onChange={this.onFieldChange.bind(this, 'password')} />
                        <a className="label" href="javascript:;">找回密码</a>
                    </div>
                </form>

                <button className="btn-login" onClick={this.handleLogin.bind(this)}>登录</button>
            </div>
        );
    }
}