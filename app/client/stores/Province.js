import Reflux from 'reflux';
import actions from '../actions/Province';

var store = Reflux.createStore({
    listenables: actions,

    onFetchProvinceList() {

    }
});