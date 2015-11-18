import React from 'react';
import {RaisedButton, FlatButton, TextField, SelectField} from 'material-ui';
import request from 'superagent';
import md5 from 'md5';
import Notification from '../../mixins/Notification';
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

        var localStorage = window.localStorage;
        request.post('http://106.38.138.61:3000/api/login').send({
            username: this.state.phone,
            password: md5(this.state.password)
        }).end((error, res)=>{
            var result = res.body;
            if(result.status == 200) {
                localStorage.setItem('isLogin', true);
                localStorage.setItem('administration', JSON.stringify(result.data));


                notification.show('登录成功', function() {
                    window.location.hash = '#/';
                });
            }
            else if(result.status == 404) {
                notification.show('用户名或者密码错误');
            }
            else {
                notification.show(result.message);
            }
        })
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