import React, { Component } from 'react'
import {Button,Input, Divider,Row,Col,Modal,Radio,List,DatePicker,Pagination,Popconfirm,message} from 'antd';
import './schedule.scss'
import axios from 'axios'
const { RangePicker, } = DatePicker;
const { TextArea } = Input;
export default class schedule extends Component {
      constructor(props) {
        super(props);
        this.state={
            collapsed: false,
            visible: false,
            formItem:{
              title:'',
              note:'',
              remind:'',
              username:JSON.parse(localStorage.getItem("username")),
            },
            formItems:{
              title:'',
              note:'',
              remind:'',
              username:JSON.parse(localStorage.getItem("username")),
            },  
            data:[]
        }
      }
      componentDidMount(){
        this.list()
      }
      onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };
      showModal = item => {
        this.setState({
          visible: true,
        });
        if(item !=='A'){
          this.setState({
            formItem:item,
          });
        }
      };

      handleOk = e => {
        axios({
          method:'post',
          url:'/api/index/schedule/newContact',
          data:this.state.formItem,
        }).then((res)=>{
          console.log(res.data.code)
            if(res.data.code === 200){
              this.setState({
                visible: false,
              })
              message.success(res.data.data);
              this.list();
            }else{
              message.error(res.data.data);
            }
        })
      };

      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
      formChange(attr,e){
        let { formItem } = this.state;
        formItem[attr] = e.target.value;
        this.setState({
          formItem
        });
        console.log(attr,e.target.value)
      }
      formChanges(attr,e){
        let { formItems } = this.state;
        formItems[attr] = e.target.value;
        this.setState({
          formItems
        });
        console.log(attr,e.target.value)
      }
      dateChange(date, dateString) {
        console.log('11111111111')
        console.log(date, dateString);
      }
      list = ()=>{
        axios({
          method:'get',
          url:'/api/index/schedule/list',
          params:{
            username:JSON.parse(localStorage.getItem("username")),
          },
        }).then((res)=>{
          if(res.data.code === 200){
            this.setState({
              data:res.data.data,
            })
          }
        })
      };
      query(){
        axios({
          method:'post',
          url:'/api/index/schedule/querys',
          data:this.state.formItems,
        }).then((res)=>{
            if(res.data.code === 200){
              this.setState({
                data:res.data.data,
              })
            }
        })
      }
      handleDelete = id => {
        console.log(id)
        axios({
          method:'get',
          url:'/api/index/schedule/deleteContact/'+id,
        }).then((res)=>{
          if(res.data.code === 200){
            message.success(res.data.data);
            this.list();
          }else{
            message.error(res.data.data);
          }
        })
      };
      onChange = (page, pageSize) =>{
        console.log(page, pageSize)


      }
    render() {
        return (
          <div className="index">
            <div className="indexTop">
              <Modal width='700px' okText="确定" cancelText="取消" title="添加日程" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} >
                <Row>
                    {/* <Col span={12}>请选择要提醒的日期：<DatePicker style={{width:250}} onChange={e =>(this.dateChange())}/></Col> */}
                    <Col span={12}>备注：<TextArea placeholder="请输入备注" value={this.state.formItem.note}  onChange={e =>{this.formChange('note',e)}}/></Col>
                    <Col span={12}>是否启用日程提醒功能:<br></br>
                      <Radio.Group value={this.state.formItem.remind} onChange={e =>{this.formChange('remind',e)}}>
                          <Radio value={'1'}>是</Radio>
                          <Radio value={'2'}>否</Radio>
                      </Radio.Group>
                    </Col>
                </Row>
              </Modal>
              <div className="input">
                <Row>
                  {/* <Col span={7}>日期范围：<RangePicker value={this.state.formItems.title} onChange={e =>{this.formChanges('title',e)}}/></Col> */}
                  <Col span={6}>关键字：<Input value={this.state.formItems.note}  onChange={e =>{this.formChanges('note',e)}}className="inputWidth" /></Col>
                  <Col span={6}><Button type="primary" onClick={e =>{this.query()}} >查询</Button></Col>
                </Row>
              </div>
            </div>
            <div className="indexContent">
              <Button type="primary" onClick={e =>{this.showModal('A')}}>添加日程</Button>
              <List itemLayout="horizontal" dataSource={this.state.data} renderItem={item => (
                <List.Item>
                    <List.Item.Meta title={item.title} description={item.note}/><Button onClick={e =>{this.showModal(item)}} type="primary">修改</Button>
                    <Divider type="vertical" />
                    <Popconfirm title="是否要删除此日程?" onConfirm={() => this.handleDelete(item.id)} okText="确认删除" cancelText="取消" >
                    <Button type="danger">删除</Button>
                  </Popconfirm>
                </List.Item>
                )}/>
                <Pagination onChange={this.onChange} style={{ textAlign: 'center' }} defaultCurrent={1} total={50} />
            </div>
          </div>
        );
    }
}
