import Reflux from 'reflux';
import request from 'superagent';
import moment from 'moment';
import ApiConfig from '../config/api';
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
    console.log(ApiConfig.api.base + 'programs/showadministration/' + terminalId);
    request
    .get(ApiConfig.api.base + 'programs/showadministration/' + terminalId)
    .end((error, res)=>{
        if(error) {
            notification.show(error);
        }
        else {
            var result = res.body;
            console.log(result);
            if(result.status == 200) {
                this.completed(result.program);
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
actions.create.listen(function(administrationId, terminalId, program, date) {
    request
        .post(ApiConfig.prefix + 'administration/' + administrationId + '/terminal/' + terminalId + '/program/' + date)
        .send(program).end((error, res)=>{

            if(error) {
                notification.show(error);
            }
            else {
                var result = res.body;
                if(result.status == 200) {
                    notification.show('节目单创建成功', function() {
                        window.location.hash = '#/terminal/' + terminalId + '/program/list/' + date;
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
        url: ApiConfig.bms_prefix + 'action=push',
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