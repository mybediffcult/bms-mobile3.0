import Reflux from 'reflux';
import terminalActions from '../actions/Terminal';

var store = Reflux.createStore({
    listenables: [terminalActions],

    onFetchAllCompleted: function(data) {
        this.trigger(data);
    },
    onGetOnlineNumCompleted: function (data) {
        this.trigger(data);
    }
});

export default store;