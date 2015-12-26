import React from 'react';
import Icon from 'react-fa';
import {RaisedButton} from 'material-ui';
import '../../styles/form.less';
import './styles/authorize.less';

export default class authorize extends React.Component {
    render(){
        return (
            <div className="ad-author form-page">
                <h2 className="title">
                    <a className="left" href="#/administration/index">返回 </a>节目单委托管理
                </h2>

                <p>&nbsp;&nbsp;&nbsp;&nbsp;尊敬的管理员 您好，如果您工作繁忙没有时间制作节目单，
                可以全权委托给健康传播卫星网客服人员，由我们帮助您制作节目单，
                点击“确认委托”即可生效。您也可以取消委托，
                将在您取消委托5个工作日内受理完成。
                </p>
                
                <RaisedButton style={{width:'40%',margin: '2rem 30%'}} label="确认委托" secondary={true} fullWidth={false} />
            </div>
        );
    }
}