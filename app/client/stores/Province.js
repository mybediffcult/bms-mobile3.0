import Reflux from 'reflux';
import provinceActions from '../actions/Province';

var store = Reflux.createStore({
    listenables: [provinceActions],

    onFetchAllCompleted(data) {
        this.trigger(data);
    }
});

export default store;