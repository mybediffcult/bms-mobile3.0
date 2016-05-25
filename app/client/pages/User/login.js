import React from 'react';
import request from 'superagent';
import Notification from '../../mixins/Notification';
import NavBar from '../../components/NavBar';
import UserActions from '../../actions/User';
import {Checkbox} from 'material-ui';
import Route from'react-router';
import {Link} from 'react-router';

import './styles/login.less';
import '../../styles/form.less';

var notification=new Notification();

export default class login extends React.Component {
	constructor() {
		super();
		this.state={
      phone:JSON.parse(localStorage.getItem('admins')) ? JSON.parse(localStorage.getItem('admins')).phone:'',
      password:JSON.parse(localStorage.getItem('admins'))?  JSON.parse(localStorage.getItem('admins')).password:'',
      check:false
		}
	}

    handleLogin(){
    	if(!this.state.phone){
    		notification.show('请填写登录手机号');
            return;
    	}
    	if(!this.state.password){
    		notification.show('请填写登录密码');
            return;
    	}
        UserActions.login(this.state.phone,this.state.password);    
    }
     
    /*
     **表单项改变
     */
    onFieldChange(field,event){
        var state=this.state;
        if(state[field]!==event.target.value){
            state[field]=event.target.value;
            localStorage.setItem('admin',JSON.stringify(state));
            
        }
        if(state.check){
          state[field]=event.target.value;
          localStorage.setItem('admins',JSON.stringify(state));
        }
        this.setState(state);
    }

    /*
      **保存用户信息
      */
  onSaveAdmin(){
    this.state.check=!this.state.check;
    if(this.state.check){      
      localStorage.setItem('admins',JSON.stringify(this.state));
      this.setState(this.state);
    }  
  }

    /*
      **检测用户
      */
      onCheck(){
        var localStorage=window.localStorage;
       var admin=JSON.parse(localStorage.getItem('admin'));
       console.log(admin.phone);   
      if(!admin.phone){
        notification.show('请填写登录手机号');
            return;   
      }
      else{
           UserActions.check(admin.phone);
      }

      }

    render(){
        return(
           <div className="user-login-page">
              <NavBar mainText="健康传播卫星网"  />
              <form className="login-form">
                <div className="form-control">
                  <input type="text" placeholder="请在此输入用户名(预留手机号)" value={this.state.phone} onChange={this.onFieldChange.bind(this,'phone')} />
                </div>
                <div className="form-control">
                  <input type="password" placeholder="请在此输入您的密码" value={this.state.password} onChange={this.onFieldChange.bind(this,'password')} />
                  <a className="findBack"  onClick={this.onCheck}>找回密码</a>  
                </div>
                
                <div className="form-save">
                   <div className="left">
                   <Checkbox label="" id="remember" ref='remember' style={{heigit:'2.0rem',width:'2.0rem'}}/>
                   <label htmlFor="remember" onClick={this.onSaveAdmin.bind(this)}>记住我</label>
                   </div>
                  <Link className="right" to="/user/updata">立即注册</Link>
                </div>
                
              </form>
                
              <button className="btn-login" onClick={this.handleLogin.bind(this)}>登录</button>
              <footer className="btn-footer">健康传播卫星网</footer>
           </div>    
            )
    }
}