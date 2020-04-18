import React, { Component } from 'react'
import {Form, Icon, Input, Button, Checkbox,message } from 'antd';
import axios from 'axios'
import './login.scss'
import ReactCanvasNest from 'react-canvas-nest';
class login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
    if (!err) {
      axios({
        method:'post',
        url:'/api/login/loginSystem',
        data:values,
      }).then((res)=>{
          if(res.data.code === 200){
            var a = JSON.stringify(res.data.data[0].username)
            var b = JSON.stringify(res.data.data[0].id)
            console.log(b)
            localStorage.setItem('username',a);
            localStorage.setItem('id',b);
            console.log(a)
            message.success(res.data.message);
            this.props.history.push({ pathname : '/index',})
          }else{
            message.error(res.data.message);
          }
      })
    }
    });
  };
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount(){
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
          <div className="login">
            <div className="center">
              <div className="top"><a href="./logins">没有账号? 去注册></a></div>
              <div className="center1">
                <div className="title">通讯录系统</div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <Form.Item>
                    {getFieldDecorator('username', {
                      rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                      <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="用户名"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: '请输入密码!' }],
                    })(
                      <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="密码"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true,
                    })(<Checkbox>记住密码</Checkbox>)}<br></br>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      登录
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
            <ReactCanvasNest className='canvasNest' config = {{ pointColor: ' 255, 255, 255 ' }} style = {{ zIndex: 99 }} />
          </div>
    );
  }
}
  const logina = Form.create({ name: 'logina' })(login);

export default logina