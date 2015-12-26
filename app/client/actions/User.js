import Reflux from 'reflux';
import request from 'superagent';
import ApiConfig from '../config/api';
import Notification from '../mixins/Notification';
var notification = new Notification();

var actions = Reflux.createActions({
    'create': {children: ['completed']},
    'login': {children: ['completed']},
    'logout': {children: ['completed']},
    'getUser': {children: ['completed']}
});

/**
 * 创建机构
 * @param administration Object
 */
actions.create.listen(function(administration) {
    request.post(ApiConfig.prefix + 'administration').send(administration).end((error, res)=>{
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
 * 登录
 * @param username String
 * @param password String
 */
actions.login.listen(function(username, password) {
    request.post(ApiConfig.prefix + 'login').send({
        username: username,
        password: password
    }).end((error, res)=>{
        if(error) {
            notification.show(error);
        }
        else {
            var localStorage = window.localStorage;

            var result = res.body;
            if(result.status == 200) {
                localStorage.setItem('administration', JSON.stringify(result.data));
                notification.show('登录成功', function() {
                    window.location.hash = '#/';
                });
            }
            else if(result.status == 404) {
                notification.show('用户名或者密码错误');
            }
            else {
                notification.show(result.message);
            }
        }

    })
});

/**
 * 登出
 */
actions.logout.listen(function() {
    var localStorage = window.localStorage;
    localStorage.removeItem('administration');
    location.hash = '#/user/login';
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

export default actions;