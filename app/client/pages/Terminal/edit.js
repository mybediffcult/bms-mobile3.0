import React from 'react';
import {RaisedButton, FlatButton, TextField, SelectField} from 'material-ui';
import '../../styles/form.less';

export default class edit extends React.Component {
    constructor() {
        super();

        this.state = {
            fields: {
                tid: '',
                disk: '',
                intel: '',
                mac: '',
                netcard: '',
                factory: '',
                name: '',
                installPlace: ''
            },
            errors: {
                tid: '',
                disk: '',
                intel: '',
                mac: '',
                netcard: '',
                factory: '',
                name: '',
                installPlace: ''
            }
        };
    }

    onMacChange(mac) {
        var fields = this.state.fields;
        fields['mac'] = mac.toUpperCase();
        this.setState({fields: fields});
    }


    onFieldChange(field, event) {
        if(field == 'mac') {
            this.onMacChange(event.target.value);
        }
        else {
            var fields = this.state.fields;
            fields[field] = event.target.value;
            this.setState({fields: fields});
        }
    }

    validate(field) {
        var errors = this.state.errors;
        errors[field] = '';

        // 验空
        if(this.state.fields[field] == '') {
            errors[field] = '该项不能为空';
        }

        // 验证电话号码格式
        if(field == 'phone') {
            if(!/^0?1[3|4|5|8][0-9]\d{8}$/.test(this.state.fields.phone)) {
                errors[field] = '电话号码格式不正确';
            }
        }

        //验证密码
        if(field == 'conPassword' && this.state.fields.password != this.state.fields.conPassword) {
            errors[field] = '前后两次密码不一致';
        }

        this.setState({errors: errors});
    }

    render() {
        return (
            <div className="terminal-edit-page form-page">

                <h2 className="title">
                    <a href="#terminal/index">返回</a>
                    添加设备
                </h2>

                <form>
                    <TextField
                        floatingLabelText="* 设备编号(必填)"
                        hintText=""
                        fullWidth={true}
                        onChange={this.onFieldChange.bind(this, 'tid')}
                        errorText={this.state.errors.tid}
                        value={this.state.fields.tid}/>

                    <TextField
                        floatingLabelText="* 硬盘编号(必填)"
                        hintText=""
                        fullWidth={true}
                        onChange={this.onFieldChange.bind(this, 'disk')}
                        errorText={this.state.errors.disk}
                        value={this.state.fields.disk}/>

                    <TextField
                        floatingLabelText="* 智能卡号(必填)"
                        hintText=""
                        fullWidth={true}
                        onChange={this.onFieldChange.bind(this, 'intel')}
                        errorText={this.state.errors.intel}
                        value={this.state.fields.intel}/>
                    <TextField
                        floatingLabelText="* mac地址(必填)"
                        hintText=""
                        fullWidth={true}
                        onChange={this.onFieldChange.bind(this, 'mac')}
                        errorText={this.state.errors.mac}
                        value={this.state.fields.mac}/>

                    <TextField
                        floatingLabelText="网卡号"
                        hintText=""
                        fullWidth={true}
                        onChange={this.onFieldChange.bind(this, 'netcard')}
                        errorText={this.state.errors.netcard}
                        value={this.state.fields.netcard}/>

                    <TextField
                        floatingLabelText="工厂号"
                        hintText=""
                        fullWidth={true}
                        onChange={this.onFieldChange.bind(this, 'factory')}
                        errorText={this.state.errors.factory}
                        value={this.state.fields.factory}/>

                    <TextField
                        floatingLabelText="* 设备名称(必填)"
                        hintText=""
                        fullWidth={true}
                        onChange={this.onFieldChange.bind(this, 'name')}
                        errorText={this.state.errors.name}
                        value={this.state.fields.name}/>

                    <TextField
                        floatingLabelText="* 安装地点(必填)"
                        hintText=""
                        fullWidth={true}
                        onChange={this.onFieldChange.bind(this, 'installPlace')}
                        errorText={this.state.errors.installPlace}
                        value={this.state.fields.installPlace}/>

                    <RaisedButton style={{margin: '1rem 0 0 0'}} label="提交" secondary={true} fullWidth={true} />
                </form>
            </div>
        );
    }
}