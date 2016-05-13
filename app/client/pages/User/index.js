import React from 'react';
import Icon from 'react-fa';
import NavBar from '../../components/NavBar';
import Navigation from '../../components/Navigation';

import UserActions from '../../actions/User';
import UserStore   from '../../stores/User';

import './styles/index.less';

export default class index extends React.Component {

    constructor() {
        super();
        this.state = {
            loaded: false,
            isAuthorizeDialogOpen: false,
            administration: null,
            open: false
        };
    }

    componentWillMount() {
        this.unsubscribeUserStore = UserStore.listen(this.onUserStoreChange.bind(this));
        UserActions.getUser();
    }

    componentWillUnmount() {
        this.unsubscribeUserStore();
    }

    /**
     * 监听用户数据变化
     * @param data
     */
    onUserStoreChange(data) {
        this.setState({administration: data, loaded: true});
    }

    /**
     * 登出
     */
    logout() {
        UserActions.logout();
    }

    onAuthorize() {
        UserActions.authorize(this.state.administration.administrationid);
        this.setState({isAuthorizeDialogOpen: false});
    }


    render() {
        console.log(this.state.administration);
        console.log(data);
        if(this.state.loaded) {
            return (
                <div className="user-index-page">
                    <NavBar mainText="用户" />

                    <div className="user-info">
                        <article className="info-box border">
                            <header className="header">
                                <span className="icon"><Icon name="map-marker" /></span>
                                <span className="title">机构归属地信息</span>
                            </header>

                            <ul className="info-item-list">
                                <li>
                                    <label className="label">省份</label>
                                    <span className="content">{this.state.administration.province}</span>
                                </li>

                                <li>
                                    <label className="label">市/地区</label>
                                    <span className="content">{this.state.administration.city}</span>
                                </li>

                                <li>
                                    <label className="label">详细地址</label>
                                    <span className="content">{this.state.administration.address}</span>
                                </li>
                            </ul>
                        </article>

                        <article className="info-box">
                            <header className="header">
                                <span className="icon"><Icon name="user" /></span>
                                <span className="title">机构管理员信息</span>
                            </header>

                            <ul className="info-item-list">
                                <li>
                                    <label className="label">手机号码</label>
                                    <span className="content">{this.state.administration.telephone}</span>
                                </li>

                                <li>
                                    <label className="label">电子邮箱</label>
                                    <span className="content">{this.state.administration.email ? this.state.administration.email : '无'}</span>
                                </li>
                            </ul>
                        </article>
                    </div>


                    <div className="cell-box">
                        <div className="cell authorize">
                            <span className="left">节目单委托管理</span>
                            <span className="right">
                                {this.state.administration.is_authorized == 1 ? '已委托' : <button className="btn-authorize" onClick={()=>{this.setState({isAuthorizeDialogOpen: true});}}>委托</button>}
                            </span>
                        </div>
                    </div>

                    <div className="cell-box">
                        <a className="cell maintain" href="#/user/repair">
                            <span className="left">一键报修</span>
                            <span className="right">
                                <Icon name="chevron-right" />
                            </span>
                        </a>
                        <a className="customer_service" href="tel:4008010133">客服电话&nbsp;&nbsp;&nbsp;&nbsp;4008010133</a>
                    </div>

                    <div className="logout">
                        <button className="btn-logout" onClick={this.logout.bind(this)}>退出登录</button>
                    </div>

                    <div className={"authorize-dialog" + (this.state.isAuthorizeDialogOpen ? "" : " hidden")}>
                        <header className="header">节目单委托管理</header>
                        <div className="body">
                            尊敬的管理员:<br/>
                            您好，我们衷心地愿意为您提供服务，经过您的确认将由我们来为您制作节目单，并随时接受您的监督。如果您不需要我们的帮助，将在您和我们说明后5个工作日内受理完成。
                        </div>
                        <footer className="footer">
                            <button className="cancel" onClick={()=>{this.setState({isAuthorizeDialogOpen: false});}}>取消</button>
                            <button className="confirm" onClick={this.onAuthorize.bind(this)}>确定</button>
                        </footer>
                    </div>

                    <Navigation/>
                </div>
            );
        }

        else {
            return (
                <div className="blank-page"></div>
            );
        }

    }
}