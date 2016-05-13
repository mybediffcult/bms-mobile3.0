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
import AdministrationActions from '../../actions/User';

import '../../styles/form.less';
import './styles/register.less';

var notification = new Notification();

export default class register extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,

            fields: {
               level:'',
               location_code:'',
               name:'',
               address:'',
               province_code:'',
               city_code:'',
            },

            errors: {
               level:'',
               location_code:'',
               name:'',
               address:'',
               province_code:'',
               city_code:'',
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
        if(field!='address' && field!= 'province_code'&& field!='city_code' && this.state.fields[field] == '') {
            errors[field] = '该项不能为空';
        }
        
        //验证level符不符合条件
        if(field=='level'){
            if(this.state.fields.level!= 1 && this.state.fields.level!= 2 &&this.state.fields.level!=3){
                errors[field]='level 等级不符合条件';
            }
        }
        
        //验证地区编码格式
        if(field=='location_code'){
            if(!/^([1-9]{1})([0-9]{5})$/.test(this.state.fields.location_code)){
                errors[field] ='地区编码格式不对';
            }
        }

        //验证城市编码格式
        if(field=='city_code'&& this.state.fields.city_code!=''){
            if(!/^([1-9]{1})([0-9]{5})$/.test(this.state.fields.city_code)){
                errors[field] ='城市编码格式不对';
            }
        }

        //验证省编码格式
        if(field=='province-code'&&this.state.fields.province_code!=''){
            if(!/^([1-9]{1})([0-9]{5})$/.test(this.state.fields.province_code)){
                errors[field] ='省编码格式不对';
            }
        }
        //
        // // 验证电话号码格式
        // if(field == 'phone') {
        //     if(!/^0?1[3|4|5|8][0-9]\d{8}$/.test(this.state.fields.phone)) {
        //         errors[field] = '电话号码格式不正确';
        //     }
        // }

        // //验证密码
        // if(field == 'conPassword' && this.state.fields.password != this.state.fields.conPassword) {
        //     errors[field] = '前后两次密码不一致';
        // }

        this.setState({errors: errors});
    }

    /**
     * 表单提交
     */
    onSubmit() {
        // this.validate('province');
        // this.validate('city');
        // this.validate('address');
        // this.validate('name');
        // this.validate('phone');
        // this.validate('password');
        // this.validate('conPassword');
        this.validate('level');
        this.validate('location_code');
        this.validate('name');
        this.validate('address');
        this.validate('province_code');
        this.validate('city_code');

        var isValid = true;
        for(var key in this.state.errors) {
            isValid &= this.state.errors[key] == '';
        }

        if(isValid) {

            var administration = {
                level:this.state.fields.level,
                location_code:this.state.fields.location_code,
                name:this.state.fields.name,
                address:this.state.fields.address,
                province_code:this.state.fields.province_code,
                city_code:this.state.fields.city_code
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
                        floatingLabelText="* 等级level(必填)"
                        fullWidth={true}
                        valueMember="level"
                        displayMember="name"
                        value={this.state.fields.level}
                        errorText={this.state.errors.level}
                        onChange={this.onFieldChange.bind(this, 'level')}
                        onBlur={this.validate.bind(this, 'level')} />

                    <SelectField
                        floatingLabelText="* 地区编码(必填)"
                        fullWidth={true}
                        valueMember="location_code"
                        displayMember="name"
                        value={this.state.fields.location_code}
                        errorText={this.state.errors.location_code}
                        onChange={this.onFieldChange.bind(this, 'location_code')}
                        onBlur={this.validate.bind(this, 'location_code')} />

                    <TextField
                        floatingLabelText="* 机构名称(必填)"
                        hintText=""
                        fullWidth={true}
                        onChange={this.onFieldChange.bind(this, 'name')}
                        onBlur={this.validate.bind(this, 'name')}
                        value={this.state.fields.name}
                        errorText={this.state.errors.name}/>

                    // <TextField
                    //     floatingLabelText="* 详细地址(必填)"
                    //     hintText=""
                    //     fullWidth={true}
                    //     onChange={this.onFieldChange.bind(this, 'address')}
                    //     onBlur={this.validate.bind(this, 'address')}
                    //     value={this.state.fields.address}
                    //     errorText={this.state.errors.address} />

                    // <TextField
                    //     floatingLabelText="* 电话号码(必填)"
                    //     hintText=""
                    //     fullWidth={true}
                    //     onChange={this.onFieldChange.bind(this, 'phone')}
                    //     onBlur={this.validate.bind(this, 'phone')}
                    //     value={this.state.fields.phone}
                    //     errorText={this.state.errors.phone}/>

                    // <TextField
                    //     type="password"
                    //     floatingLabelText="* 密码(必填)"
                    //     hintText=""
                    //     fullWidth={true}
                    //     onChange={this.onFieldChange.bind(this, 'password')}
                    //     onBlur={this.validate.bind(this, 'password')}
                    //     value={this.state.fields.password}
                    //     errorText={this.state.errors.password}/>

                    // <TextField
                    //     type="password"
                    //     floatingLabelText="* 确认密码(必填)"
                    //     hintText=""
                    //     fullWidth={true}
                    //     onChange={this.onFieldChange.bind(this, 'conPassword')}
                    //     onBlur={this.validate.bind(this, 'conPassword')}
                    //     value={this.state.fields.conPassword}
                    //     errorText={this.state.errors.conPassword}/>

                    <TextField
                        floatingLabelText="* 机构地址(选填,可以为空)"
                        hintText=""
                        fullWidth={true}
                        onChange={this.onFieldChange.bind(this, 'address')}
                        onBlur={this.validate.bind(this, 'address')}
                        value={this.state.fields.address}
                        errorText={this.state.errors.address}/>

                    <TextField
                        floatingLabelText="* 省编码(选填)"
                        hintText=""
                        fullWidth={true}
                        onChange={this.onFieldChange.bind(this, 'province_code')}
                        onBlur={this.validate.bind(this, 'province_code')}
                        value={this.state.fields.province_code}
                        errorText={this.state.errors.province_code}/>

                    <TextField
                        floatingLabelText="* 市编码(选填)"
                        hintText=""
                        fullWidth={true}
                        onChange={this.onFieldChange.bind(this, 'city_code')}
                        onBlur={this.validate.bind(this, 'city_code')}
                        value={this.state.fields.city_code}
                        errorText={this.state.errors.city_code}/>

                    <RaisedButton style={{margin: '1rem 0 0 0'}} label="提交" secondary={true} fullWidth={true} onClick={this.onSubmit.bind(this)} />
                </form>
                {this.state.loading ? <Loading/> : ''}
            </div>
        );
    }
}