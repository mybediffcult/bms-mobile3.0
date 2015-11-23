import Reflux from 'reflux';
import request from 'superagent';
import Notification from '../mixins/Notification';
var notification = new Notification();

var actions = Reflux.createActions({
    'fetch': {children: ['completed']}
});

/**
 * 获取时段列表
 * @param administrationId Number
 */
actions.fetch.listen(function(administrationId) {
    request.get('http://106.38.138.61:3000/api/administration/' + administrationId + '/timebuckets').end((error, res)=>{

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