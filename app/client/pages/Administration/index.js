import React from 'react';
import Icon from 'react-fa';
import {Dialog,RaisedButton} from 'material-ui';
import './styles/index.less';
import '../../styles/page.less';

export default class index extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            administration: {},
            open: false
        };
    }

    logout() {
        window.localStorage.removeItem('isLogin');
        window.localStorage.removeItem('administration');
        window.location.hash = '#/login';
    }

    componentWillMount() {
        this.setState({loading: false, administration: JSON.parse(window.localStorage.getItem('administration'))});
    }

    onCancel(event) {
        this.setState({open:false});
    }

    openDialog(event){
        this.setState({open:true});
    }

    render() {
        console.log(this.state.administration);
        if(!this.state.loading)
        return (
            <div className="ad-index-page page">
                <h2 className="title">
                    {JSON.parse(window.localStorage.getItem('administration')).administrationName}
                </h2>

                <div className="infor">
                    <div className="retail">
                        <p><Icon name='street-view'/>{"  "}机构归属地信息</p>
                        <ul>
                            <li>省份{"  "+this.state.administration.province}</li>
                            <li>市/地区{"  "+this.state.administration.city}</li>
                            <li>详细地址</li>
                            <li>{"  "+this.state.administration.address}</li>
                        </ul>
                    </div>

                    <div className="retail">
                        <p><Icon name='user'/>{"  "}机构管理员信息</p>
                        <ul>
                            <li>电话号码{"  "+this.state.administration.telephone}</li>
                            <li>邮箱{"  "}123456</li>
                        </ul>
                    </div>
                </div>

                <div className="other">
                    <ul>
                        <li><a onClick={this.openDialog.bind(this)}><span className="text">联系客服</span><span className="icon"><Icon name='phone'/></span></a></li>
                        <li><a href="#/administration/check"><span className="text">故障报修</span><span className="icon"><Icon name='commenting-o'/></span></a></li>
                        <li><a href="#/administration/authorize"><span className="text">节目委托</span><span className="icon"><Icon name='eye'/></span></a></li>
                    </ul>
                    <RaisedButton style={{width:'50%',margin:'1rem 25%',height: '40px'}} label="退出登录" secondary={true}  />
                </div>

                <Dialog
                    title="客服电话"
                    actions={[{ text: (<a href="tel:13141286492" style={{textDecoration:'none',color:'rgb(0,188,212)'}}>确定</a> )},
                    { text: '取消', onTouchTap: this.onCancel.bind(this) }]}
                    open={this.state.open} >
                    010-xxxxxx
                </Dialog>
            </div>
        );
        else
        return (
            <div className="blank-page"></div>
        );
    }
}