import Reflux from 'reflux';
import request from 'superagent';
import Notification from '../mixins/Notification';
var notification = new Notification();

var actions = Reflux.createActions({
    'fetch': {children: ['completed']}
});

actions.fetch.listen(function(provinceCode) {
    console.log(provinceCode);
    request.get('http://106.38.138.61:3000/api/province/' + provinceCode + '/cities').end((error, res)=>{
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

export default actions;