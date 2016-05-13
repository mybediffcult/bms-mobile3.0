import React from 'react';
import {RaisedButton, FlatButton, TextField, SelectField} from 'material-ui';
import request from 'superagent';
import Notification from '../../mixins/Notification';
import NavBar from '../../components/NavBar';
import UserStore from '../../stores/User';
import UserActions from '../../actions/User';

import '../../styles/form.less';
import './styles/updata.less';

var notification = new Notification();

export default class updata extends React.Component {
  	 constructor() {
        super();

        this.state = {
            fields: {
               password:'',
               username:'',
               phone:'',
               name:'',
               email:'',
               newpassword1:'',
               newpassword2:'',
            },
            errors: {
               password:'',
               username:'',
               phone:'',
               name:'',
               email:'',
               newpassword1:'',
               newpassword2:'',
            }
        };
    }
    
    onHandleChange(field,event){
    	var fields=this.state.fields;
    	fields[field]=event.target.value;
    	this.setState({fields:fields});
    }

    onHandleUpdata(){
       var localStorage=window.localStorage;
       var admin=JSON.parse(localStorage.getItem('admin'));
       if(!this.state.fields.password){
       	notification.show('请填写原来的密码');
       	return;
       }
       
       if (!this.state.fields.newpassword1) {
        notification.show('请填写新密码');
        return;
       }
       if(!this.state.fields.newpassword2){
       	notification.show('请再次填写新密码');
       	return;
       }
       if(this.state.fields.newpassword1!=this.state.fields.newpassword2){
        notification.show('两次输入的新密码不一致');
        return;
       }
       UserActions.updata(admin.phone,this.state.fields);

    }
   render(){
   	return(
         <div className="updata">
            <NavBar mainText="修改个人的信息" />
            <div className="editItem">
              <span>&nbsp;请输入初始密码:</span>
              <input type='password'placeholder="您的初始密码(必填)" className='inputItem'value={this.state.fields.password} onChange={this.onHandleChange.bind(this,'password')}/>
            </div>
            <div className="editItem">
              <span>&nbsp;用户名:</span>
              <input className='inputItem'placeholder="需要更改则填写" value={this.state.fields.username} onChange={this.onHandleChange.bind(this,'username')}/>
            </div>
            <div className="editItem">
              <span>&nbsp;电话:</span>
              <input className='inputItem'placeholder="需要更改则填写"value={this.state.fields.phone} onChange={this.onHandleChange.bind(this,'phone')}/>
            </div>
            <div className="editItem">
              <span>&nbsp;姓名:</span>
               <input className='inputItem'placeholder="需要更改则填写"value={this.state.fields.name} onChange={this.onHandleChange.bind(this,'name')}/>
            </div>
            <div className="editItem">
               <span>&nbsp;邮箱:</span>
               <input className='inputItem'placeholder="需要更改则填写"value={this.state.fields.email} onChange={this.onHandleChange.bind(this,'email')}/>
            </div>
            <div className="editItem">
               <span>&nbsp;请输入新密码:</span>
               <input className='inputItem' placeholder="新的密码"type="password" value={this.state.fields.newpassword1}  onChange={this.onHandleChange.bind(this,'newpassword1')}/>
            </div>
            <div className="editItem">
               <span>&nbsp;请再次输入新密码:</span>
               <input className='inputItem' placeholder="确认新密码"type="password" value={this.state.fields.newpassword2} onChange={this.onHandleChange.bind(this,'newpassword2')}/>
            </div>
            <footer className="button">
              <RaisedButton className="raisedbutton"  label="提交修改" secondary={true} onClick={this.onHandleUpdata.bind(this)}/>
            </footer>
         </div> 
   		);
   }


}