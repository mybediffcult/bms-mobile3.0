import React from 'react';
import {RaisedButton, FlatButton, TextField, SelectField} from 'material-ui';
import request from 'superagent';
import Notification from '../../mixins/Notification';

import TerminalActions from '../../actions/Terminal';

import '../../styles/form.less';

var notification = new Notification();

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

    componentWillMount() {
        this.administration = JSON.parse(window.localStorage.getItem('administration'));
    }

    onMacChange(mac) {
        var fields = this.state.fields;
        fields['mac'] = mac.toUpperCase();
        this.setState({fields: fields});
        if(!/^[a-z,A-Z,\d]{1,12}$/.test(this.state.fields.mac)) {
            var errors = this.state.errors;
            errors['mac'] = 'mac地址格式不正确';
            this.setState({errors: errors});
        }
        else {
            var errors = this.state.errors;
            errors['mac'] = '';
            this.setState({errors: errors});
        }
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

        if(field == 'mac') {
            if(!/^[a-z,A-Z,\d]{12}$/.test(this.state.fields[field])) {
                errors[field] = 'MAC地址格式不正确';
            }
        }

        this.setState({errors: errors});
    }

    onSubmit() {
        this.validate('tid');
        this.validate('disk');
        this.validate('intel');
        this.validate('mac');
        this.validate('name');
        this.validate('installPlace');

        var isValid = true;
        for(var key in this.state.errors) {
            isValid &= this.state.errors[key] == '';
        }

        if(isValid) {


            var terminal = {
                administrationId: this.administration.administrationid,
                terminalId: this.state.fields.tid,
                diskId: this.state.fields.disk,
                intelligencecardId: this.state.fields.intel,
                mac: this.state.fields.mac,
                name: this.state.fields.name,
                installplace: this.state.fields.installPlace,
                netcardId: this.state.fields.netcard,
                factoryId: this.state.fields.factory
            };

            TerminalActions.create(terminal);

        }

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
                        onBlur={this.validate.bind(this, 'tid')}
                        errorText={this.state.errors.tid}
                        value={this.state.fields.tid}/>

                    <TextField
                        floatingLabelText="* 硬盘编号(必填)"
                        hintText=""
                        fullWidth={true}
                        onChange={this.onFieldChange.bind(this, 'disk')}
                        onBlur={this.validate.bind(this, 'disk')}
                        errorText={this.state.errors.disk}
                        value={this.state.fields.disk}/>

                    <TextField
                        floatingLabelText="* 智能卡号(必填)"
                        hintText=""
                        fullWidth={true}
                        onChange={this.onFieldChange.bind(this, 'intel')}
                        onBlur={this.validate.bind(this, 'intel')}
                        errorText={this.state.errors.intel}
                        value={this.state.fields.intel}/>
                    <TextField
                        floatingLabelText="* mac地址(必填)"
                        hintText=""
                        fullWidth={true}
                        onChange={this.onFieldChange.bind(this, 'mac')}
                        onBlur={this.validate.bind(this, 'mac')}
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
                        onBlur={this.validate.bind(this, 'name')}
                        errorText={this.state.errors.name}
                        value={this.state.fields.name}/>

                    <TextField
                        floatingLabelText="* 安装地点(必填)"
                        hintText=""
                        fullWidth={true}
                        onChange={this.onFieldChange.bind(this, 'installPlace')}
                        onBlur={this.validate.bind(this, 'installPlace')}
                        errorText={this.state.errors.installPlace}
                        value={this.state.fields.installPlace}/>

                    <RaisedButton style={{margin: '1rem 0 0 0'}} label="提交" secondary={true} fullWidth={true} onClick={this.onSubmit.bind(this)} />
                </form>
            </div>
        );
    }
}