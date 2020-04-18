import React, { Component } from 'react'
import {Button,Input,Table, Divider,Row,Col,Modal,Radio,Popconfirm,message } from 'antd';
import '../../App.css';
import './communication.scss'
import axios from 'axios'
const { TextArea } = Input;

export default class communication extends Component {
    constructor(props) {
      super(props);
      this.state = {
        collapsed: false,
        visible: false,
        value: 1,
        data:[], 
        page:{current: 2, pageSize: 10},
        formItem:{
          name:'',
          phoneNumber:'',
          birthday:'',
          subgroup:'',
          note:'',
          username:JSON.parse(localStorage.getItem("username")),
        },
        formItems:{
          name:'',
          phoneNumber:'',
          birthday:'',
          subgroup:'',
          note:'',
          police:'',
          username:JSON.parse(localStorage.getItem("username")),
        }
      };
    }
    componentDidMount(){
      this.list()
    }
    formChange(attr,e){
        let { formItem } = this.state;
        formItem[attr] = e.target.value;
        this.setState({
          formItem
        });
      }
      formChanges(attr,e){
        let { formItems } = this.state;
        formItems[attr] = e.target.value;
        this.setState({
          formItems
        });
      }
      onCollapse = collapsed => {
        this.setState({ collapsed });
      };
      showModal = (text, record) => {
            this.setState({
              visible: true,
            }); 
            if(text !=='A'){
              this.setState({
                formItems:record,
              });
            }
      };
      handleOk = e => {
        axios({
          method:'post',
          url:'/api/index/communication/newContact',
          data:this.state.formItems,
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
        this.setState({
          visible: false,
        });
      };
      list = ()=>{
        axios({
          method:'get',
          url:'/api/index/communication/list',
          params:{
            username:JSON.parse(localStorage.getItem("username")),
          },
        }).then((res)=>{
          if(res.data.code === 200){
            console.log(res.data.data)
            this.setState({
              data:res.data.data,
            })
          }
        })
      };
      tableChange = (pagination, filters, sorter)=>{
        this.setState({
          page:pagination,
        });
      }
      handleDelete = id => {
        console.log(id)
        axios({
          method:'get',
          url:'/api/index/communication/deleteContact/'+id,
        }).then((res)=>{
          if(res.data.code === 200){
            message.success(res.data.data);
            this.list();
          }else{
            message.error(res.data.data);
          }
        })
      };
      query(){
        axios({
          method:'post',
          url:'/api/index/communication/querys',
          data:this.state.formItem,
        }).then((res)=>{
            if(res.data.code === 200){
              this.setState({
                data:res.data.data,
              })
            }
        })
      }
    render() {
      const columns = [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '手机号',
          dataIndex: 'phoneNumber',
          key: 'phoneNumber',
        },
        {
          title: '生日日期',
          dataIndex: 'birthday',
          key: 'birthday',
        },
        {
          title: '所属分组',
          dataIndex: 'subgroup',
          key: 'subgroup',
        },
        {
          title: '备注',
          key: 'note',
          dataIndex: 'note',
        },
        {
          title: '备注',
          key: 'police',
          dataIndex: 'police',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
              <Button type="primary" onClick={e =>{this.showModal(text, record)}}>修改</Button>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此联系人?" onConfirm={() => this.handleDelete(record.id)}>
                <Button type="danger">删除</Button>
              </Popconfirm>
            </span>
          ),
        },
      ];
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', 
          name: record.name,
        }),
      };
        return (
          <div className="communication">
            <div className="communicationTop">
              <Modal width='700px' okText="确定" cancelText="取消" title="添加联系人" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} >
                <Row>
                  <Col span={12}>姓名：<Input value={this.state.formItems.name} className="inputWidth" onChange={e =>{this.formChanges('name',e)}} placeholder="请输入姓名" /></Col>
                  <Col span={12}>手机号：<Input value={this.state.formItems.phoneNumber} className="inputWidth" onChange={e =>{this.formChanges('phoneNumber',e)}} placeholder="请输入手机号" /></Col>
                </Row>
                <Row>
                    <Col span={12}>生日日期：<Input value={this.state.formItems.birthday} className="inputWidth" onChange={e =>{this.formChanges('birthday',e)}} placeholder="请输入生日日期" /></Col>
                    <Col span={12}>所属分组：<Input value={this.state.formItems.subgroup} className="inputWidth" onChange={e =>{this.formChanges('subgroup',e)}} placeholder="请输入所属分组" /></Col>
                </Row>
                <Row>
                    <Col span={12}>备注：<TextArea value={this.state.formItems.note} className="inputWidth" onChange={e =>{this.formChanges('note',e)}}  placeholder="请输入备注" /></Col>
                    <Col span={12}>是否启用生日报警功能:<br></br>
                      <Radio.Group onChange={e =>{this.formChanges('police',e)}} value={this.state.formItems.police}>
                        <Radio value={'1'}>是</Radio>
                        <Radio value={'2'}>否</Radio>
                      </Radio.Group>
                    </Col>
                </Row>
              </Modal>
              <div className="input">
                <Row>
                  <Col span={6}>姓名：<Input value={this.state.formItem.name} className="inputWidth" onChange={e =>{this.formChange('name',e)}} placeholder="请输入姓名" /></Col>
                  <Col span={6}>手机号：<Input value={this.state.formItem.phoneNumber} className="inputWidth" onChange={e =>{this.formChange('phoneNumber',e)}} placeholder="请输入手机号" /></Col>
                  <Col span={6}>生日日期：<Input value={this.state.formItem.birthday} className="inputWidth" onChange={e =>{this.formChange('birthday',e)}} placeholder="请输入生日日期" /></Col>
                  <Col span={6}>所属分组：<Input value={this.state.formItem.subgroup} className="inputWidth" onChange={e =>{this.formChange('subgroup',e)}} placeholder="请输入所属分组" /></Col>
                  <Col span={6}>备注：<Input value={this.state.formItem.note} className="inputWidth" onChange={e =>{this.formChange('note',e)}} placeholder="请输入备注" /></Col>
                  <Col span={6}><Button type="primary" onClick={e =>{this.query()}} >查询</Button></Col>
                </Row>
              </div>
            </div>
            <div className="communicationContent">
              <Button type="primary" onClick={e =>{this.showModal('A', 'A')}}>添加联系人</Button>
              <Table rowSelection={rowSelection} columns={columns} position={false} rowKey="id" dataSource={this.state.data} onChange={this.tableChange} tableLayout="fixed"/>
            </div>
          </div>
        );
    }
}
