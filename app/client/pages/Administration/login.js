import React from 'react';
import {RaisedButton, FlatButton, TextField, SelectField} from 'material-ui';
import '../../styles/form.less';
import './styles/login.less';

export default class login extends React.Component {
    render() {
        return (
            <div className="ad-login-page">
                <form>
                    <h2 className="title">健康传播卫星网</h2>
                    <TextField
                        floatingLabelText="电话号码"
                        hintText=""
                        fullWidth={true}/>

                    <TextField
                        type="password"
                        floatingLabelText="密码"
                        hintText=""
                        fullWidth={true}/>

                    <RaisedButton style={{margin: '1rem 0 0 0'}} label="登录" secondary={true} fullWidth={true} />

                    <footer>
                        <a className="right" href="/register">注册</a>
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