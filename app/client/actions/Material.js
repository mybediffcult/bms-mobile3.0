import Reflux from 'reflux';
import request from 'superagent';
import ApiConfig from '../config/api';
import Notification from '../mixins/Notification';
var notification = new Notification();

var actions = Reflux.createActions({
    'fetch': {children: ['completed']}
});

/**
 * 获取素材列表
 * @param terminalId String
 */
actions.fetch.listen(function(terminalId) {
    request.get(ApiConfig.prefix + 'terminal/' + terminalId + '/content').end((error, res)=>{

        if(error) {
            notification.show(error);
        }
        else {
            var result = res.body;

            if(result.status == 200) {
                var data = result.data;
                this.completed(data);
            }
            else {
                notification.show(result.message);
            }
        }
    });
});

export default actions;