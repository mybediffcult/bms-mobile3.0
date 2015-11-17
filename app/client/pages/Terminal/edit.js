import React from 'react';
import {RaisedButton, FlatButton, TextField, SelectField} from 'material-ui';
import '../../styles/form.less';

export default class edit extends React.Component {
    render() {
        return (
            <div className="terminal-edit-page form-page">

                <h2 className="title">
                    <a href="/terminal/index">返回</a>
                    添加设备
                </h2>

                <form>
                    <TextField
                        floatingLabelText="设备编号"
                        hintText=""
                        fullWidth={true}/>

                    <TextField
                        floatingLabelText="硬盘编号"
                        hintText=""
                        fullWidth={true}/>

                    <TextField
                        floatingLabelText="智能卡号"
                        hintText=""
                        fullWidth={true}/>
                    <TextField
                        floatingLabelText="mac地址"
                        hintText=""
                        fullWidth={true}/>

                    <TextField
                        floatingLabelText="网卡号"
                        hintText=""
                        fullWidth={true}/>

                    <TextField
                        floatingLabelText="工厂号"
                        hintText=""
                        fullWidth={true}/>

                    <TextField
                        floatingLabelText="设备名称"
                        hintText=""
                        fullWidth={true}/>

                    <TextField
                        floatingLabelText="安装地点"
                        hintText=""
                        fullWidth={true}/>

                    <RaisedButton style={{margin: '1rem 0 0 0'}} label="提交" secondary={true} fullWidth={true} />
                </form>
            </div>
        );
    }
}