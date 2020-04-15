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
          fileList: [
            {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
              uid: '-5',
              name: 'image.png',
              status: 'error',
            },
          ],
        };
      }
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
    handleChange = ({file,fileList,event }) => {
      this.setState({ fileList })
      console.log(file,'1111111111',fileList,'2222222222222',event)
    };
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        return (
            <div className="clearfix">
              {/* <img src={require('http://localhost:5000/images/1d423830-7eb9-11ea-8b78-b57630e238d2.png')} class="" alt="Image"/> */}
            <Upload
              action="/index/album/uploadImg"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
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