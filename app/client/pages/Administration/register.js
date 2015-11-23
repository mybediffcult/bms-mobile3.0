import React from 'react';
import {RaisedButton, FlatButton, TextField, SelectField} from 'material-ui';
import request from 'superagent';
import md5 from 'md5';
import Loading from '../../components/Loading';
import Notification from '../../mixins/Notification';

import ProvinceStore from '../../stores/Province';
import ProvinceActions from '../../actions/Province';
import CityStore from '../../stores/City';
import CityActions from '../../actions/City';
import AdministrationActions from '../../actions/Administration';

import '../../styles/form.less';
import './styles/register.less';

var notification = new Notification();

export default class register extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,

            fields: {
                province: '',
                city: '',
                address: '',
                name: '',
                phone: '',
                password: '',
                conPassword: ''
            },

            errors: {
                province: '',
                city: '',
                address: '',
                name: '',
                phone: '',
                password: '',
                conPassword: ''
            },

            provinces: [],
            cities: []
        };
    }

    componentWillMount() {
        this.unsubscribeProvinceStore = ProvinceStore.listen(this.onProvinceStoreChange.bind(this));
        this.unsubscribeCityStore = CityStore.listen(this.onCityStoreChange.bind(this));
        ProvinceActions.fetchAll();
    }

    componentWillUnmount() {
        this.unsubscribeProvinceStore();
        this.unsubscribeCityStore();
    }

    /**
     * 城市Store变化事件
     * @param data
     */
    onCityStoreChange(data) {
        console.log(data);
        this.setState({cities: data});
    }

    /**
     * 省份Store变化事件
     * @param data
     */
    onProvinceStoreChange(data) {
        this.setState({loading: false, provinces: data});
    }

    /**
     * 城市选择变化事件
     */
    onProvinceChange(province) {
        CityActions.fetch(province);
    }

    /**
     * 表单项改变
     * @param field
     * @param event
     */
    onFieldChange(field, event) {
        var fields = this.state.fields;
        fields[field] = event.target.value;
        this.setState({fields: fields});

        if(field == 'province') {
            this.onProvinceChange(event.target.value);
        }
    }

    /**
     * 表单验证
     * @param field
     */
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

    /**
     * 表单提交
     */
    onSubmit() {
        this.validate('province');
        this.validate('city');
        this.validate('address');
        this.validate('name');
        this.validate('phone');
        this.validate('password');
        this.validate('conPassword');

        var isValid = true;
        for(var key in this.state.errors) {
            isValid &= this.state.errors[key] == '';
        }

        if(isValid) {

            var administration = {
                provinceCode: this.state.fields.province,
                cityCode: this.state.fields.city,
                administrationName: this.state.fields.name,
                address: this.state.fields.address,
                telephone: this.state.fields.phone,
                password: md5(this.state.fields.password),
                name: '机构管理员'
            };

            AdministrationActions.create(administration);
        }
    }

    /**
     * 渲染
     * @returns {XML}
     */
    render() {
        return (
            <div className="ad-register-page form-page">

                <h2 className="title">
                    <a href="#login">返回</a>
                    机构注册
                </h2>

                <form>
                    <SelectField
                        floatingLabelText="* 所在省(必填)"
                        fullWidth={true}
                        valueMember="provincecode"
                        displayMember="name"
                        value={this.state.fields.province}
                        errorText={this.state.errors.province}
                        onChange={this.onFieldChange.bind(this, 'province')}
                        onBlur={this.validate.bind(this, 'province')}
                        menuItems={this.state.provinces} />

                    <SelectField
                        floatingLabelText="* 所在市(必填)"
                        fullWidth={true}
                        valueMember="citycode"
                        displayMember="name"
                        value={this.state.fields.city}
                        errorText={this.state.errors.city}
                        onChange={this.onFieldChange.bind(this, 'city')}
                        onBlur={this.validate.bind(this, 'city')}
                        menuItems={this.state.cities} />

                    <TextField
                        floatingLabelText="* 详细地址(必填)"
                        hintText=""
                        fullWidth={true}
                        onChange={this.onFieldChange.bind(this, 'address')}
                        onBlur={this.validate.bind(this, 'address')}
                        value={this.state.fields.address}
                        errorText={this.state.errors.address} />

                    <TextField
                        floatingLabelText="* 机构名称(必填)"
                        hintText=""
                        fullWidth={true}
                        onChange={this.onFieldChange.bind(this, 'name')}
                        onBlur={this.validate.bind(this, 'name')}
                        value={this.state.fields.name}
                        errorText={this.state.errors.name}/>

                    <TextField
                        floatingLabelText="* 电话号码(必填)"
                        hintText=""
                        fullWidth={true}
                        onChange={this.onFieldChange.bind(this, 'phone')}
                        onBlur={this.validate.bind(this, 'phone')}
                        value={this.state.fields.phone}
                        errorText={this.state.errors.phone}/>

                    <TextField
                        type="password"
                        floatingLabelText="* 密码(必填)"
                        hintText=""
                        fullWidth={true}
                        onChange={this.onFieldChange.bind(this, 'password')}
                        onBlur={this.validate.bind(this, 'password')}
                        value={this.state.fields.password}
                        errorText={this.state.errors.password}/>

                    <TextField
                        type="password"
                        floatingLabelText="* 确认密码(必填)"
                        hintText=""
                        fullWidth={true}
                        onChange={this.onFieldChange.bind(this, 'conPassword')}
                        onBlur={this.validate.bind(this, 'conPassword')}
                        value={this.state.fields.conPassword}
                        errorText={this.state.errors.conPassword}/>

                    <RaisedButton style={{margin: '1rem 0 0 0'}} label="提交" secondary={true} fullWidth={true} onClick={this.onSubmit.bind(this)} />
                </form>
                {this.state.loading ? <Loading/> : ''}
            </div>
        );
    }
}