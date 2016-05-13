import Reflux from 'reflux';
import request from 'superagent';
import ApiConfig from '../config/api';
import md5 from 'md5';
import Notification from '../mixins/Notification';
var notification = new Notification();

var actions = Reflux.createActions({
    'create': {children: ['completed']},
    'login': {children: ['completed']},
    'logout': {children: ['completed']},
    'updata':{children:['completed']},
    'getUser': {children: ['completed']},
    'authorize': {children: ['completed']},
    'check':{children:['completed']}
});
  /*
    **判断用户是否存在
   */
   actions.check.listen(function(phone){
    request
    .post(ApiConfig.api.base + 'admin-supersalts')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
        phone:phone
    })
    .end((error, res)=>{
        console.log(res);

        if(error) {
            notification.show(error);
            
        }
        else {
            var localStorage=window.localStorage;
            var result=res.result;
            var text=JSON.parse(res.text);
            console.log(res.body.data.salt);
            console.log("111");
            localStorage.setItem('salt',res.body.data.salt);
            if(text.status==200){
                notification.show('用户验证成功',function(){
                 window.location.hash="#/user/updata";
                });
            }
            else{
                notification.show('不存在此用户',function(){
                    window.location.hash="#/user/login";
                });
            }
            
        }
    })
});
/**
 * 添加机构
 * @param administration Object
 */
actions.create.listen(function(administration) {
    request
    .post(ApiConfig.api.base+ 'administrations')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send(administration)
    .end((error, res)=>{
        if(error) {
            notification.show(error);
        }
        else {
            var result = res.body;
            if(result.status == 200) {
                notification.show('机构注册成功', function() {
                    window.location.hash = '#/login';
                });
            }
            else {
                notification.show(result.message);
            }
        }
    })
});

/**
 * 登录3.0
 */
actions.login.listen(function(phone,password) {
    request
    .post(ApiConfig.api.base + 'admin-supersalts')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
        phone:phone
    })
    .end((error, res)=>{
        if(error) {
            notification.show(error);
        }
        else {
            var localStorage = window.localStorage;

            var result = res.body;
            if(result.status==200){
                var salt=result.data.salt;
                //console.log(salt);
                request
                .post(ApiConfig.api.base+'admin-supers/login')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send({
                    phone:phone,
                    password:md5(salt+md5(md5(password)))
                })
                .end((error,res)=>{
                    if(error){
                        notification.show(error);
                    }
                    else{
                        var result=res.body;
                        console.log(result);
                        if(result.status == 200) {
                        localStorage.setItem('administration', JSON.stringify(result.data));
                        notification.show('登录成功', function() {
                        window.location.hash = '#/';
                          });
                        this.completed(result.data);
                        console.log(result.data);
                        console.log(localStorage);
                        //console.log(res);
                        //console.log(result.data);
                        }
                        else if(result.status == 404) {
                           notification.show('没有发现此用户');
                        }
                        else if (result.status==400) {
                            notification.show('用户名或者密码错误');
                        }
                    }
                });
            }            
            else {
                notification.show(result.message);
            }
        }

    });
});

/**
 * 登出
 */
actions.logout.listen(function() {
    var localStorage = window.localStorage;
    localStorage.removeItem('administration');
    window.location.hash = '#/user/login';
});

/**
  *更新用户信息/密码等等
*/
actions.updata.listen(function(phone,fields){ 
    var localStorage = window.localStorage;
        console.log(localStorage);
        var salt=localStorage.getItem('salt');
        console.log(salt);               
    request
    .put(ApiConfig.api.base+'admin-supers/1')
    .set('Content-Type','application/x-www-form-urlencoded')
    .send({
        password: md5(salt+md5(md5(fields.password))),
        username:fields.username,
        phone:fields.phone,
        name:fields.name,
        email:fields.email,
        newpassword1:md5(md5(fields.newpassword1)),
        newpassword2:md5(md5(fields.newpassword2))
    })
    .end((error, res)=>{
        
        console.log(fields.password);
        console.log(fields.newpassword1);
        console.log(fields.newpassword2);
        if(error) {
            notification.show(error);
        }
        else{
            console.log(res);
           
            var result = res.body;
            console.log(result);
            if(result.status==200){
                localStorage.setItem('administration', JSON.stringify(result.data));
                notification.show('修改成功', function() {
                window.location.hash = '#/';
                });
            }
            else if(result.status==400){
                notification.show('fail');
            }
            else if(result.status==404){
                notification.show('输入密码错误');
            }
            else if(result.status==501){
                notification.show('两次输入的密码不一致');
            }
            else {
                notification.show('未知错误');
            }
        }
       });
});
/**
 * 获取用户信息
 */
actions.getUser.listen(function() {
    var localStorage = window.localStorage;
    var administration = JSON.parse(localStorage.getItem('administration'));
    if(!administration) {
        location.hash = '#/user/login';
    }
    else {
        this.completed(administration);
    }

});


/**
 * 授权
 * @param administration Object
 */
actions.authorize.listen(function(aid) {
    request.post(ApiConfig.api.base+ 'administration/' + aid + '/authorized').end((error, res)=>{
        if(error) {
            notification.show(error);
        }
        else {
            var result = res.body;
            if(result.status == 200) {
                var localStorage = window.localStorage;
                var administration = JSON.parse(localStorage.getItem('administration'));
                administration.is_authorized = 1;
                localStorage.setItem('administration', JSON.stringify(administration));
                this.completed(administration);
            }
            else {
                notification.show(result.message);
            }
        }
    })
});


export default actions;