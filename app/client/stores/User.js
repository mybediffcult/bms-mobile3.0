import Reflux from 'reflux';
import userActions from '../actions/User';

var store = Reflux.createStore({
    listenables: [userActions],

    onGetUserCompleted: function(data) {
        this.trigger(data);
    }
});

export default store;