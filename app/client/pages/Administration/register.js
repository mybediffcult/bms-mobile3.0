import React from 'react';
import {RaisedButton, FlatButton, TextField, SelectField} from 'material-ui';
import './styles/register.less';
import './styles/common.less';

export default class register extends React.Component {
    render() {
        return (
            <div className="ad-register-page ad-full-page">

                <h2 className="title">
                    <a href="/login">返回</a>
                    机构注册
                </h2>

                <form>
                    <SelectField
                        floatingLabelText="省"
                        fullWidth={true}
                        valueMember="id"
                        displayMember="name"
                        value=""
                        menuItems={[{id: 1, name: '广西'}, {id: 2, name: '广东'}, {id: 3, name: '北京'}]} />

                    <SelectField
                        floatingLabelText="市"
                        fullWidth={true}
                        valueMember="id"
                        displayMember="name"
                        value=""
                        menuItems={[{id: 1, name: '广西'}, {id: 2, name: '广东'}, {id: 3, name: '北京'}]} />

                    <TextField
                        floatingLabelText="详细地址"
                        hintText=""
                        fullWidth={true}/>

                    <TextField
                        floatingLabelText="机构名称"
                        hintText=""
                        fullWidth={true}/>

                    <TextField
                        floatingLabelText="电话号码"
                        hintText=""
                        fullWidth={true}/>

                    <TextField
                        type="password"
                        floatingLabelText="密码"
                        hintText=""
                        fullWidth={true}/>

                    <TextField
                        type="password"
                        floatingLabelText="确认密码"
                        hintText=""
                        fullWidth={true}/>

                    <RaisedButton style={{margin: '1rem 0 0 0'}} label="提交" secondary={true} fullWidth={true} />
                </form>
            </div>
        );
    }
}