import Reflux from 'reflux';
import timebucketActions from '../actions/Timebucket';

var store = Reflux.createStore({
    listenables: [timebucketActions],

    onFetchCompleted: function(data) {
        this.trigger(data);
    }
});

export default store;