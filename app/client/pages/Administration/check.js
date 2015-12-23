import React from 'react';
import Icon from 'react-fa';
import {DropDownMenu,TextField,RaisedButton,Checkbox} from 'material-ui';
import '../../styles/form.less';
import './styles/check.less';

export default class check extends React.Component {
    constructor(){
      super();
      this.state={
        fields:{
          person:'',
          phone:'',
          wrong:''
        },
        errors:{
          person:'',
          phone:'',
          wrong:''
        }
      };
    }

    changeInput(field,event){
      var errors=this.state.errors;
      errors[field]='';
      var fields=this.state.fields;
      fields[field]= event.target.value;
      this.setState({fields:fields});

      if(field==='person'){
        if(!/[\u4e00-\u9fa5a-zA-Z]/.test(this.state.fields.person)){
          errors[field]="输入格式不对";
        }
      }
      if(field==='phone'){
        if(!/[0-9]{1,11}/.test(this.state.fields.phone)){
          errors[field]="输入格式不对";
        }
      }
      this.setState({errors:errors});
    }

    blurInput(field){
      var errors=this.state.errors;
      errors[field]='';
      var fields=this.state.fields;

      if(fields[field]===''){
        errors[field]='输入不能为空';
      }
      else{
        if(field==='person'){
          if(!/[\u4e00-\u9fa5a-zA-Z]/.test(fields.person)){
            errors[field]="输入格式不对";
          }
        }

        if(field==='wrong'){
          if(fields[field].length>150){
            errors[field]="输入字数超过150";
          }
        }

        if(field==='phone'){
          if(!/[0-9]{11}/.test(fields.phone)){
            errors[field]="输入格式不对";
          }
        }
      }
      this.setState({errors:errors});
    }

    render(){
      let menuItems = [
         { payload: '1', text: '设备名称' },
         { payload: '2', text: 'Every Night' },
         { payload: '3', text: 'Weeknights' },
         { payload: '4', text: 'Weekends' },
         { payload: '5', text: 'Weekly' },
      ];

        return(
            <div className="ad-check form-page ">
                <h2 className="title"><a href="#/administration/index" className="">返回</a>一键报修</h2>

                <form className="form">
                  
                  <DropDownMenu 
                    style={{width:'40%',margin:'0 30%'}}
                    labelStyle={{color:'#00bcd4'}}
                    menuItems={menuItems} />

                   <textarea
                   rows="4" cols="30"
                   onChange={this.changeInput.bind(this,'wrong')}
                   onBlur={this.blurInput.bind(this,'wrong')}
                   placeholder="请填写设备的故障描述，150字以内"
                   value={this.state.fields.wrong} />
                   <p>{this.state.errors.wrong}</p>

                   <div className="allbox">
                      <div className="checkbox">
                         <input id="c1" type="checkbox" name="problem" />
                         <label htmlFor="c1">&nbsp;&nbsp;设备无法开机</label>
                      </div>

                      <div className="checkbox" >
                         <input id="c2" type="checkbox" name="problem" />
                         <label htmlFor="c2">&nbsp;&nbsp;遥控失灵</label>
                      </div>

                      <div className="checkbox" >
                         <input id="c3" type="checkbox" name="problem" />
                         <label htmlFor="c3">&nbsp;&nbsp;画面蓝屏或雪花点</label>
                      </div>

                      <div className="checkbox" >
                         <input id="c4" type="checkbox" name="problem" />
                         <label htmlFor="c4">&nbsp;&nbsp;漏电</label>
                      </div>

                      <div className="checkbox">
                         <input id="c5" type="checkbox" name="problem" />
                         <label htmlFor="c5">&nbsp;&nbsp;声音伴有交流声</label>
                      </div>

                      <div className="checkbox" >
                         <input id="c6" type="checkbox" name="problem" />
                         <label htmlFor="c6">&nbsp;&nbsp;设备无法开机</label>
                     </div>
                   </div>

                   <div className="text">
                     <label htmlFor="ab-person">报修人</label>
                     <input type="text" required="required" 
                            onChange={this.changeInput.bind(this,'person')}
                            onBlur={this.blurInput.bind(this,'person')}
                            id="ab-person" />
                     <p>{this.state.errors.person}</p>
                   </div>

                   <div className="text">
                     <label htmlFor="ab-phone">联系方式</label>
                     <input type="text" required="required" 
                            onChange={this.changeInput.bind(this,'phone')}
                            onBlur={this.blurInput.bind(this,'phone')}
                            id="ab-phone" />
                     <p>{this.state.errors.phone}</p>
                   </div>
                   
                    <RaisedButton style={{width:'84%',margin:'1rem 8%'}} label="提交" secondary={true} />
                </form>  
            </div>
        );
    }
}
