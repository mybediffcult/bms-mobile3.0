import Reflux from 'reflux';
import request from 'superagent';
import ApiConfig from '../config/api';
import Notification from '../mixins/Notification';
var notification = new Notification();

var actions = Reflux.createActions({
    'fetchAll': {children: ['completed']},
    'create': {children: ['completed']},
    'getOnlineNum': {children: ['completed']},
    'getNPNum': {children: ['completed']},
    'getDateWithProgram' : {children: ['completed']}
});

/**
 * 获取设备列表
 * @param administrationId Number
 */
actions.fetchAll.listen(function(administrationId) {
    request.get(ApiConfig.prefix + 'administration/' + administrationId + '/terminals').end((error, res)=>{

        if(error) {
            notification.show(error);
        }
        else {
            var result = res.body;
            if(result.status == 200) {
                var terminalList = result.data;
                this.completed(terminalList);
            }
            else {
                notification.show(result.message);
            }
        }
    })
});

/**
 * 创建设备
 * @param terminal Object
 */
actions.create.listen(function(terminal) {
    request.post(ApiConfig.prefix + 'terminal').send(terminal).end((error, res)=>{
        if(error) {
            notification.show(error);
        }
        else {
            var result = res.body;
            if(result.status == 200) {
                notification.show('设备添加成功', function() {
                    window.location.hash = '#/terminal/list';
                });
            }
            else {
                notification.show(result.message);
            }
        }
    })
});

actions.getOnlineNum.listen(function(administrationId) {
    request.get(ApiConfig.prefix + 'administration/' + administrationId + '/terminal_num').end((error, res)=>{
        if(error) {
            notification.show(error);
        }
        else {
            var result = res.body;
            if (result.status == 200) {
                this.completed(result.data);
            }
            else {
                notification.show(result.message);
            }
        }
    })
});


actions.getNPNum.listen(function(administrationId) {
    request.get(ApiConfig.prefix + 'administration/' + administrationId + '/np_terminal_num').end((error, res)=>{
        if(error) {
            notification.show(error);
        }
        else {
            var result = res.body;
            if (result.status == 200) {
                this.completed(result.data);
            }
            else {
                notification.show(result.message);
            }
        }
    })
});

/**
 * 获取有节目单的日期
 * @param administrationId Number
 */
actions.getDateWithProgram.listen(function(terminalId) {
    request.get(ApiConfig.prefix + 'terminal/' + terminalId + '/date').end((error, res)=>{

        if(error) {
            notification.show(error);
        }
        else {
            var result = res.body;
            if(result.status == 200) {
                var date = result.data;
                this.completed(date);
            }
            else {
                notification.show(result.message);
            }
        }
    })
});


export default actions;