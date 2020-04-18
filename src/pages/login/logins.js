import React, { Component } from 'react'
import {Form,Input,Select,Button,message } from 'antd';
import './logins.scss'
import axios from 'axios'
import ReactCanvasNest from 'react-canvas-nest';
const { Option } = Select;
class logins extends Component {
      state = {
        confirmDirty: false,
      };
      handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            axios({
              method:'post',
              url:'/api/login/newContact',
              data:values,
            }).then((res)=>{
              console.log(res.data.code)
                if(res.data.code === 200){
                this.props.history.push({ pathname : '/login',})
                  message.success(res.data.data);
                }else{
                  message.error(res.data.data);
                }
            })
          }
        });
      };

      handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      };

      compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('两次输入的密码不一致!');
        } else {
          callback();
        }
      };

      validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      };
      render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
        };
        const tailFormItemLayout = {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 16,
              offset: 8,
            },
          },
        };
        const prefixSelector = getFieldDecorator('prefix', {
          initialValue: '86',
        })(
          <Select style={{ width: 70 }}>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
          </Select>,
        );
    
        return (
          <div className="logins">
                <div className="center">
                  <div className="title">注册</div>
                  <div className="center1">
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                      <Form.Item
                          label="用户名"
                        >
                        {getFieldDecorator('username', {
                          rules: [{ required: true, message: '请输入用户名！', whitespace: true }],
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="密码" hasFeedback>
                        {getFieldDecorator('password', {
                          rules: [
                            {
                              required: true,
                              message: '请输入您的密码！',
                            },
                            {
                              validator: this.validateToNextPassword,
                            },
                          ],
                        })(<Input.Password />)}
                      </Form.Item>
                      <Form.Item label="确认密码" hasFeedback>
                        {getFieldDecorator('confirm', {
                          rules: [
                            {
                              required: true,
                              message: '请确认您的密码！',
                            },
                            {
                              validator: this.compareToFirstPassword,
                            },
                          ],
                        })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                      </Form.Item>
                      <Form.Item label="手机号">
                        {getFieldDecorator('phone', {
                          rules: [{ required: true, message: '请输入正确的手机号码!' }],
                        })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                      </Form.Item>
                      <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                          确定
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
const loginsa = Form.create({ name: 'logins' })(logins);
export default loginsa