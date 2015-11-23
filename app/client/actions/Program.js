import Reflux from 'reflux';
import request from 'superagent';
import $ from 'jquery';
import Notification from '../mixins/Notification';
var notification = new Notification();

var actions = Reflux.createActions({
    'fetch': {children: ['completed']},
    'create': {children: ['completed']},
    'push':  {children: ['completed']}
});

/**
 * 获取节目单列表
 * @param terminalId String
 */
actions.fetch.listen(function(terminalId) {
    request.get('http://106.38.138.61:3000/api/terminal/' + terminalId + '/programs').end((error, res)=>{
        if(error) {
            notification.show(error);
        }
        else {
            var result = res.body;
            if(result.status == 200) {
                this.completed(result.data);
            }
            else {
                notification.show(result.message);
            }
        }
    })
});

/**
 * 创建节目单
 * @param administrationId String
 * @param terminalId String
 * @param timebucketId String
 * @param sequence String
 */
actions.create.listen(function(administrationId, terminalId, timebucketId,  sequence) {
    request
        .put('http://106.38.138.61:3000/api/administration/' + administrationId + '/terminal/' + terminalId + '/timeBucket/' + timebucketId + '/program')
        .send({
            sequence: sequence
        }).end((error, res)=>{

            if(error) {
                notification.show(error);
            }
            else {
                var result = res.body;
                if(result.status == 200) {
                    notification.show('节目单创建成功', function() {
                        window.location.hash = '#/terminal/list';
                    });
                }
                else {
                    notification.show(result.message);
                }
            }
        })
});

/**
 * 推送节目单
 * @param terminalId String
 */
actions.push.listen(function(terminalId) {
    $.ajax({
        url: 'http://106.38.138.61:8088/bms/public/index.php?controller=api&action=push',
        type: 'POST',
        data: {terminalid: terminalId},
        success: function(data) {
            data = JSON.parse(data);
            if(data.status == 200) {
                notification.show('推送成功', function() {
                    window.location.hash = '#/terminal/list';
                });
            }
            else {
                notification.show(data.message);
            }
        }
    });
});


export default actions;