import React, { Component } from 'react'
import {Input, Button,message} from 'antd';
import './system.scss'
import axios from 'axios'
export default class system extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formItem:{
                id:JSON.parse(localStorage.getItem("id")),
                password:'',
            }
        };
      }
      formChange(attr,e){
        let { formItem } = this.state;
        formItem[attr] = e.target.value;    
        this.setState({
          formItem
        });
      }
    changePassword(){
        axios({
            method:'post',
            url:'/api/login/newContact',
            data:this.state.formItem
        }).then((res)=>{
            if(res.data.code === 200){
                message.success(res.data.data);
            }
        })
    }
    render() {
        return (
            <div>
                <Input  value={this.state.formItem.password} type="password" className="inputWidth" placeholder="修改密码"  onChange={e =>{this.formChange('password',e)}} /><br></br>
                <Button onClick={e =>{this.changePassword()}} type="primary">修改密码</Button>
            </div>
        )
    }
}