import React from 'react';
import Icon from 'react-fa';
import Notification from '../../mixins/Notification';
import './styles/index.less';

var notification = new Notification();

export default class ProgramPreview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            editing: false,
            previewList: props.previewList
        };
    }

    componentWillReceiveProps(props) {
        this.setState({previewList: props.previewList});
    }

    onEditStateChange() {
        this.setState({editing: !this.state.editing});
    }

    onSelect(index) {
        var previewList = this.state.previewList;
        var preview = previewList[index];
        preview.checked = !preview.checked;
        previewList[index] = preview;
        this.setState({previewList: previewList});
    }

    selectAll() {
        var previewList = this.state.previewList;
        var isAllSelected = previewList.every((preview)=>{
            return preview.checked;
        });

        previewList = previewList.map((preview)=>{
            preview.checked = !isAllSelected;
            return preview;
        });
        this.setState({previewList: previewList});
    }


    del() {
        var previewList = this.state.previewList;
        var isChecked = previewList.some((preview)=>{
            return preview.checked;
        });
        if(!isChecked) {
            notification.show("请选择要删除的项目");
            return;
        }

        previewList = previewList.filter((preview)=>{
            return !preview.checked;
        });
        this.setState({previewList: previewList});
    }

    hide() {
        if(this.props.onCompleted) {
            var previewList = this.state.previewList;
            previewList = previewList.map((preview)=>{
                delete preview.checked;
                return preview;
            });
            this.props.onCompleted(previewList);
        }

        this.setState({open: false});
    }

    show() {
        this.setState({open: true});
    }

    render() {

        var previewList = this.state.previewList.map((preview, index)=>{
            return (
                <li key={"preview-" + index}>
                    {this.state.editing ? <input type="checkbox" checked={preview.checked} onChange={this.onSelect.bind(this, index)} /> : ''}
                    <img src={'http://106.38.138.61:8088/bms/public/' + preview.imagepath} />
                    <div className="info">
                        <p className="duration">时长: {Math.ceil(preview.length / 60)}分钟</p>
                        <p className="name">{preview.contenttitle}</p>
                    </div>
                </li>
            );
        });

        return (
            <div className={this.state.open ? "program-preview" : "program-preview hidden"}>
                <header className="header">
                    <span className="left" onClick={this.hide.bind(this)}><Icon name="chevron-left" /></span>
                    <span className="middle">预览节目单</span>
                    <span className="right" onClick={this.onEditStateChange.bind(this)}>
                        {this.state.editing ? "取消" : <Icon className="icon" name="trash-o" />}
                    </span>
                </header>
                <ul className="preview-list">
                    {previewList}
                </ul>


                <div className={this.state.editing ? "btn-edit-group" : "btn-edit-group hidden"}>
                    <button className="select-all" onClick={this.selectAll.bind(this)}>全选</button>
                    <button className="del" onClick={this.del.bind(this)}>删除</button>
                </div>
            </div>
        );
    }
}

ProgramPreview.defaultProps = {
    previewList: [
        {
            productid: '12',
            contenttitle: '节目名称',
            imagepath: 'http://lorempixel.com/g/300/300/',
            length: 1000000
        },
        {
            productid: '12',
            contenttitle: '节目名称',
            imagepath: 'http://lorempixel.com/g/300/300/',
            length: 1000000
        },
        {
            productid: '12',
            contenttitle: '节目名称',
            imagepath: 'http://lorempixel.com/g/300/300/',
            length: 1000000
        },
        {
            productid: '12',
            contenttitle: '节目名称',
            imagepath: 'http://lorempixel.com/g/300/300/',
            length: 1000000
        },
        {
            productid: '12',
            contenttitle: '节目名称',
            imagepath: 'http://lorempixel.com/g/300/300/',
            length: 1000000
        },
        {
            productid: '12',
            contenttitle: '节目名称',
            imagepath: 'http://lorempixel.com/g/300/300/',
            length: 1000000
        }
    ]
};