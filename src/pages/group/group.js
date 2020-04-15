import React, { Component } from 'react'
import {Popconfirm,Button,Input,message} from 'antd';
import '../../App.css';
import './group.scss'
import axios from 'axios'
export default class group extends Component {
    state = {
      collapsed: false,
    };
    componentDidMount(){
      this.list()
    }
    onCollapse = collapsed => {
      console.log(collapsed);
      this.setState({ collapsed });
    };
    constructor(props){
      super(props);
      this.state={
          group : [],
          formItem:{
            grouping:'',
            username:JSON.parse(localStorage.getItem("username")),
          }
      };
    }
    confirm(e) {
      axios({
        method:'get',
        url:'/index/group/deleteContact/'+e,
      }).then((res)=>{
        if(res.data.code === 200){
          message.success(res.data.data);
          this.list();
        }else{
          message.error(res.data.data);
        }
      })
    }
    handleOk = () => {
      axios({
        method:'post',
        url:'/index/group/newContact',
        data:this.state.formItem,
      }).then((res)=>{
        console.log(res.data.code)
          if(res.data.code === 200){
            message.success(res.data.data);
            this.setState({
              formItem:{
                grouping:'',
              }
            })
            this.list();
          }else{
            message.error(res.data.data);
          }
      })
    };
    formChange(attr,e){
      console.log(e.target.value)
      let { formItem } = this.state;
      formItem[attr] = e.target.value;
      this.setState({
        formItem
      });
    }
    list = ()=>{
      axios({
        method:'get',
        url:'/index/group/list',
        params:{
          username:JSON.parse(localStorage.getItem("username")),
        },
      }).then((res)=>{
        if(res.data.code === 200){
          this.setState({
            group:res.data.data,
          })
        }
      })
    };
    render() {
        return (
            <div className="group">
              <div className="group1">
                <Input value={this.state.formItem.grouping} onChange={e =>{this.formChange('grouping',e)}}></Input>
                <Button type="dashed" onClick={e =>{this.handleOk()}}>+添加分组</Button>
              </div>
              {this.state.group.map((item,index)=>{
                return <div key={item.id} className="group2">
                    <div>{item.grouping}</div>
                    <Popconfirm title="确认删除此分组？(请确认此分组下没有联系人)" onConfirm={() => this.confirm(item.id)} okText="确认删除" cancelText="取消" >
                      <Button>删除</Button>
                    </Popconfirm>,
                  </div>
              })}
            </div>
        );
    }
}
