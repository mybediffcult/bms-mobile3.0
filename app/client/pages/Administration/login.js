import React from 'react';
import {RaisedButton, FlatButton, TextField, SelectField} from 'material-ui';
import './styles/common.less';
import './styles/login.less';

export default class login extends React.Component {
    render() {
        return (
            <div className="ad-full-page ad-login-page ">
                <form>
                    <h2 className="title">健康卫星传播网</h2>
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
                    北京新讯信息技术有限公司
                    <br/>
                    Copyright © 2015
                </p>
            </div>
        );
    }
}