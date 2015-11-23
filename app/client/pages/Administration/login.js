import React from 'react';
import {RaisedButton, FlatButton, TextField, SelectField} from 'material-ui';
import request from 'superagent';
import md5 from 'md5';
import Notification from '../../mixins/Notification';

import AdministrationActions from '../../actions/Administration';

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

        AdministrationActions.login(this.state.phone, md5(this.state.password));
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
            <div className="ad-login-page">
                <form>
                    <h2 className="title">健康传播卫星网</h2>
                    <TextField
                        floatingLabelText="电话号码"
                        hintText=""
                        onChange={this.onFieldChange.bind(this, 'phone')}
                        value={this.state.phone}
                        fullWidth={true}/>

                    <TextField
                        type="password"
                        floatingLabelText="密码"
                        hintText=""
                        onChange={this.onFieldChange.bind(this, 'password')}
                        value={this.state.password}
                        fullWidth={true}/>

                    <RaisedButton style={{margin: '1rem 0 0 0'}} label="登录" secondary={true} fullWidth={true} onClick={this.handleLogin.bind(this)} />

                    <footer>
                        <a className="right" href="#register">机构注册</a>
                    </footer>
                </form>

                <p className="copyright">
                    健康传播卫星网服务管理中心
                    <br/>
                    4008010133
                    <br/>
                    Copyright © 2015
                </p>
            </div>
        );
    }
}