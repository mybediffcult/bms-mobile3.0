import Reflux from 'reflux';
import request from 'superagent';
import Notification from '../mixins/Notification';
var notification = new Notification();

var actions = Reflux.createActions({
    'fetchAll': {children: ['completed']},
    'create': {children: ['completed']},
    'getOnlineNum': {children: ['completed']}
});

/**
 * 获取设备列表
 * @param administrationId Number
 */
actions.fetchAll.listen(function(administrationId) {
    request.get('http://106.38.138.61:3000/api/administration/' + administrationId + '/terminals').end((error, res)=>{

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
    request.post('http://106.38.138.61:3000/api/terminal').send(terminal).end((error, res)=>{
        if(error) {
            notification.show(error);
        }
        else {
            var result = res.body;
            if(result.status == 200) {
                notification.show('设备添加成功', function() {
                    window.location.hash = '#/terminal/index';
                });
            }
            else {
                notification.show(result.message);
            }
        }
    })
});

actions.getOnlineNum.listen(function(administrationId) {
    request.get('http://106.38.138.61:3000/api/administration/' + administrationId + '/terminal_num').end((error, res)=>{
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

export default actions;