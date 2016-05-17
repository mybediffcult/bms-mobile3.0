import Reflux from 'reflux';
import terminalActions from '../actions/Terminal';


var store = Reflux.createStore({
    listenables: [terminalActions],

    // statistics: {
    //     onlineNum: 0,
    //     offlineNum: 0,
    //     npNum:0
    // },

    terminalList: [],

    programDate: null,

    onFetchAllCompleted: function(data) {
        this.terminalList = data;
        this.trigger(this.terminalList);
    },

    onGetOnlineNumCompleted: function (data) {
        this.statistics.onlineNum = data.onlineNum;
        this.statistics.offlineNum = data.offlineNum;
        this.trigger(this.statistics);
    },

    onGetNPNumCompleted: function (data) {
        this.statistics.npNum = data.np_terminal_num;
        this.trigger(this.statistics);
    },

    onGetDateWithProgramCompleted: function(date) {
        this.programDate = date;
        this.trigger(this.programDate);
    },


    
    onGetByOrganizationCodeCompleted:function(data){
        this.terminalList=data;
        this.trigger(this.terminalList);
    },
    onGetByStatusCompleted:function(data){
        this.terminalList=data;
        this.trigger(this.terminalList);
    },
    onGetByIdCompleted:function(data){
        this.terminalList=data;
        this.trigger(this.terminalList);
    },
    onGetByTermianlCodeCompleted:function(data){
        this.terminalList=data;
        this.trigger(this.terminalList);
    },

});

export default store;