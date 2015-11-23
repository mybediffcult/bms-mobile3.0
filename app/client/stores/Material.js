import Reflux from 'reflux';
import materialActions from '../actions/Material';

var store = Reflux.createStore({
    listenables: [materialActions],

    onFetchCompleted: function(data) {
        this.trigger(data);
    }
});

export default store;