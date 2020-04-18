import React, { Component } from 'react'
import {message,Upload, Icon, Modal} from 'antd';
import './album.scss'
import axios from 'axios'
export default class album extends Component {
    constructor(props) {
        super(props);
        this.state = {
          img : [],
          previewVisible: false,
          previewImage: '',
          formItem:{
            username:JSON.parse(localStorage.getItem("username")),
          },
          fileList: [
            // {
            //   uid: '1',
            //   name: 'image.png',
            //   status: 'done',
            //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            // },
            // {
            //   uid: '5',
            //   name: 'image.png',
            //   status: 'done',
            //   url:'/api/images/1d423830-7eb9-11ea-8b78-b57630e238d2.png'
            // },
          ],
        };
      }
      componentDidMount(){
        this.list()
      }
      list = ()=>{
        axios({
          method:'get',
          url:'/api/index/album/list',
          params:this.state.formItem,
        }).then((res)=>{
          if(res.data.code === 200){
            console.log(res.data.data)
            this.setState({
              fileList:res.data.data,
            })
          }
        })
      };
      getBase64(file) {
          return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result);
              reader.onerror = error => reject(error);
          });
      }
    handleCancel = () => this.setState({ previewVisible: false });
    handlePreview = async file => {
      if (!file.url && !file.preview) {
        file.preview = await this.getBase64(file.originFileObj);
      }
  
      this.setState({ 
        previewImage: file.url || file.preview,
        previewVisible: true,
      });
    };
    deleteImg = (val,val1)=>{
      axios({
        method:'post',
        url:'/api/index/album/deleteImg',
        data:{name:val,uid:val1},
      }).then((res)=>{
        if(res.data.code === 200){
        }
      })
    }
    handleChange = ({file,fileList,event }) => {
      this.setState({ fileList })
      console.log(file,fileList)
      if(file.status === "removed"){
        console.log('111111')
        this.deleteImg(file.name,file.uid)
      }
    };
    render() {
      const { previewVisible, previewImage, fileList } = this.state;
      return (
          <div className="clearfix">
          <Upload
            action="/api/index/album/uploadImg"
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}  
            onChange={this.handleChange}
            data={this.state.formItem}
          >
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">上传图片</div>
            </div>
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
      )
    }
}