import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import './index.css';

import {Layout, Menu, Icon, Row, Col} from 'antd';
import ArticleList from '../List';
import MyBreadcrumb from '../../Component/MyBreadcrumb'

const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

class Home extends Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    this.setState({collapsed});
  }

  render() {
    return (
      <Router>
        <Layout style={{minHeight: '100vh'}}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <Link to="/">
                  <Icon type="book"/>
                  <span>文章列表</span>
                </Link>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={<span><Icon type="user"/><span>User</span></span>}
              >
                <Menu.Item key="3">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
              <Menu.Item key="9">
                <Icon type="edit"/>
                <span>写作区</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{background: '#fff', padding: 16, fontSize: 20}}>
              <Row type="flex" justify="start" align="middle">
                <Col>MASONGZHI`s blog</Col>
              </Row>
            </Header>
            <Content style={{margin: '0 16px'}}>
              <MyBreadcrumb />
              <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                <Route exact path="/" component={ArticleList} />
              </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>
              Ant Design ©2016 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default Home;
