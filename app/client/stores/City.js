import Reflux from 'reflux';
import cityActions from '../actions/City';

var store = Reflux.createStore({
    listenables: [cityActions],

    onFetchCompleted(data) {
        this.trigger(data);
    }
});

export default store;