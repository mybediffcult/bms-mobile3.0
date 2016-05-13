import Reflux from 'reflux';
import AdminAction from '../actions/Administration.js';

var store=Reflux.createStore({
    listenables:[AdminAction],
    admin:null,

    onLoginCompleted:function(data){
        this.admin=data;
        this.trigger(this.admin);
    }

});

export default store;