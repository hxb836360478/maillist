import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon,Modal } from 'antd';
import { BrowserRouter, Route, Link,Switch } from 'react-router-dom'
import '../../App.css';
import './index.scss'
import group from '../group/group'
import communication from '../communication/communication'
import system from '../system/system'
import schedule from '../schedule/schedule'
import album from '../album/album'
import ReactCanvasNest from 'react-canvas-nest';
const { Header, Content, Footer, Sider } = Layout;
const { confirm } = Modal;
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      value: 1,
    };
  }
      onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
      };
      onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };
      showConfirm=()=>{
        var _this = this
        confirm({
          title: '确认退出本系统?',
          content: '请保存好个人信息',
          onOk() {
            localStorage.removeItem('username')
            _this.props.history.push({ pathname : '/login',})
          },
          onCancel() {},
        });
      }
    render() {
        return (
          <BrowserRouter>
            <Layout style={{ minHeight: '100vh', }}>
              <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <div className="logo" />
                  <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                      <Link to="/index/communication"><Icon type="pie-chart" /><span>通讯管理</span></Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <Link to="/index/schedule"><Icon type="pie-chart" /><span>日程管理</span></Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <Link to="/index/group"><Icon type="desktop" /><span>分组管理</span></Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                      <Link to="/index/album"><Icon type="desktop" /><span>相册</span></Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                      <Link to="/index/system"><Icon type="pie-chart" /><span>修改密码</span></Link>
                    </Menu.Item>
                  </Menu>
              </Sider>
              <Layout>
                <Header style={{ background: '#fff', padding: 0 }}><Icon className="icon" onClick={this.showConfirm} type="logout" /><span className="user">尊敬的 {JSON.parse(localStorage.getItem('username'))} 用户,欢迎您</span></Header>
                <Content style={{ margin: '0 16px' }}>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>欢迎来到私人通讯录系统</Breadcrumb.Item>
                  </Breadcrumb>
                  <div style={{ padding: 24, background: '#fff', minHeight: 750 }}>
                    <Switch>
                      <Route path="/index/group" component={group}/>
                      <Route path="/index/communication" component={communication}/>
                      <Route path="/index/schedule" component={schedule}/>
                      <Route path="/index/album" component={album}/>
                      <Route path="/index/system" component={system}/>
                      <Route path="/" component={communication}/>
                    </Switch>
                  </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>{JSON.parse(localStorage.getItem('username'))}的通讯录</Footer>
              </Layout>
            </Layout>
            <ReactCanvasNest className='canvasNest' config = {{ pointColor: ' 255, 255, 255 ' }} style = {{ zIndex: 99 }} />
          </BrowserRouter>
        );
    }
}
