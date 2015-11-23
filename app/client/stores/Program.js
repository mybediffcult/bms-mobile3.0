import Reflux from 'reflux';
import programActions from '../actions/Program';

var store = Reflux.createStore({
    listenables: [programActions],

    onFetchCompleted: function(data) {
        this.trigger(data);
    }
});

export default store;