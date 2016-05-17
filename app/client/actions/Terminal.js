import Reflux from 'reflux';
import request from 'superagent';
import ApiConfig from '../config/api';
import Notification from '../mixins/Notification';
var notification = new Notification();

var actions = Reflux.createActions({
    'fetchAll': {children: ['completed']},
    'create': {children: ['completed']},
    'getById':{children:['completed']},
    'getByOrganizationCode':{children:['completed']},
    'getByTermianlCode':{children:['completed']},
    'getByStatus':{children:['completed']},
    'getOnlineNum': {children: ['completed']},
    'getNPNum': {children: ['completed']},
    'getDateWithProgram' : {children: ['completed']},
    'reportProblem': {children: ['completed']}
});

/**
 * 获取设备列表
 * @param administrationId Number
 */
actions.fetchAll.listen(function(page,size) {
    request
    .get(ApiConfig.api.base + 'terminals/show/'+page+'/'+size)
    .end((error, res)=>{
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

/*
  * 根据省/市/机构查询设备信息
*/
actions.getByOrganizationCode.listen(function(code){
    request
    .get(ApiConfig.api.base + 'terminals/search/'+code+'/'+1+'/'+200)
    .end((error,res)=>{
        if(error) {
            notification.show(error);
        }
        else {
            var result =res.body;
            if(result.status==200){
                var terminalList=result.data;
                this.completed(terminalList);
            }
            else {
                notification.show(result.message);
            }
        }
    })
});

/*
  *根据在线状态查询设备信息
*/
actions.getByStatus.listen(function(online){
  request
  .get(ApiConfig.api.base + 'terminals/show/'+1+200+'?online='+online)
  .end((error,res)=>{
    if(error){
        notification.show(error);
    }
    else {
        var result=res.body;
        if (result,status==200) {
            var terminalList=result.data;
            this.completed(terminalList);   
        }
        else {
            notification.show(result.message);
        }
    }
  })
});

/*
  *根据设备编号查询设备信息
*/
actions.getById.listen(function(id){
    request
    .get(ApiConfig.api.base + 'terminals/' + id)
    .end((error,res)=>{
        if(error){
            notification.show(error);
        }
        else {
            var result=res.body;
            if(result.status==200){
                var terminalList=result.data;
                this.completed(terminalList);
            }
            else {
                notification.show(result.message);
            }
        }
    })
});
/*
  *根据设备编号查询设备信息
*/
actions.getByTermianlCode.listen(function(code){
  request
  .get(ApiConfig.api.base + 'terminals/searchbyno/' + 1 + 200 +'?terminal_no='+ code)
  .end((error,res)=>{
    if(error){
        notification.show(error);        
    }
    else {
        var result=res.body;
        if(result.status==200){
            var terminalList=result.data;
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


/**
 * 报修
 * @param administrationId Number
 */
actions.reportProblem.listen(function(tids, problem, reporterName, reporterContact) {
    request.post(ApiConfig.prefix + 'terminal/repair').send({
        tids: tids,
        description: problem,
        repair_user: reporterName,
        contact_info: reporterContact
    }).end((error, res)=>{
        if(error) {
            notification.show(error);
        }
        else {
            var result = res.body;
            if(result.status == 200) {
                notification.show("报修信息提交成功",function() {
                    window.location.hash = "#/user/index";
                });
            }
            else {
                notification.show(result.message);
            }
        }
    })
});


export default actions;