import React from 'react';
import Icon from 'react-fa';
import {List, ListItem, ListDivider, RaisedButton, Avatar} from 'material-ui';
import request from 'superagent';
import Notification from '../../mixins/Notification'
import '../../styles/page.less';

var notification = new Notification();

export default class list extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            programList: []
        };
    }

    componentWillMount() {
        request.get('http://106.38.138.61:3000/api/terminal/' + this.props.params.tid + '/programs').end((error, res)=>{
            var result = res.body;
            if(result.status == 200) {
                console.log(result.data);
                this.setState({loading: false, programList: result.data});
            }
        })
    }

    getPrograms(programs, levelStr) {
        return programs.map((program)=>{

            var contentList = program.contentlist.map((content)=>{
                return (
                    <ListItem key={content.productid} primaryText={content.contenttitle} leftAvatar={<Avatar src={'http://106.38.138.61:8088/bms/public/' + content.imagepath} />} disabled={true}  />
                );
            });

            return (
                <List key={program.programid} subheader={program.timebucket + "(" + levelStr + ")"}>
                    {contentList}
                </List>
            )}
        );
    }


    render() {

        return (
            <div className="program-list-page page bg-white">
                <h2 className="title">
                    <a href="#terminal/list">返回</a>
                    设备节目单
                </h2>
                <p className="subtitle">北京市海淀区神舟大厦-测</p>
                {this.state.loading ? '' : this.getPrograms(this.state.programList.countryProgram, '国家节目')}
                {this.state.loading ? '' : this.getPrograms(this.state.programList.provinceProgram, '省节目')}
                {this.state.loading ? '' : this.getPrograms(this.state.programList.cityProgram, '市节目')}
                {this.state.loading ? '' : this.getPrograms(this.state.programList.terminalProgram, '设备自有节目')}

            </div>
        );
    }
}