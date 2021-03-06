/*eslint-disable import/first*/

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import './index.less';
import Loadable from 'react-loadable';
// import { getCookie } from '../../utils/cookie';

import { Layout, Menu, Row, Col, BackTop, Button, Icon } from 'antd';
const { SubMenu } = Menu;
// 按需加载
import Loading from '../../components/Loading';
const ArticleList = Loadable({
  loader: () => import('../List'),
  loading: Loading,
});
const Article = Loadable({
  loader: () => import('../Article'),
  loading: Loading,
});
const Write = Loadable({
  loader: () => import('../Write'),
  loading: Loading,
});
const MyBreadcrumb = Loadable({
  loader: () => import('../../components/MyBreadcrumb'),
  loading: Loading,
});
const Login = Loadable({
  loader: () => import('./components/Login'),
  loading: Loading,
});
import { login, register } from '../../api';
import { isPC } from '../../utils/device';

const { Header, Content, Footer } = Layout;

class Home extends Component {
  state = {
    collapsed: false,
    visible: false,
    downVisible: false, // 移动端菜单显示
  };

  // login组件用
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  login = async form => {
    const res = await login({
      body: form,
    });
    this.props.setUser(res.user);
    this.setState({
      visible: false,
    });
  };
  register = async form => {
    const res = await register({
      body: form,
    });
    this.props.setUser(res.user);
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  toggleDownVisible = () => {
    this.setState({ downVisible: !this.state.downVisible });
  };

  render() {
    const { user } = this.props;
    const BaseMenu = (
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: isPC && '64px' }}
      >
        <Menu.Item key="1">
          <Link to="/article">文章</Link>
        </Menu.Item>
        <SubMenu title="相关链接">
          <Menu.ItemGroup title="react-qiniu-avatar-upload">
            <Menu.Item key="2-1-1">
              <a href="https://github.com/masongzhi/react-qiniu-avatar-upload" target="_blank">
                <Icon type="github" />
                仓库
              </a>
            </Menu.Item>
            <Menu.Item key="2-1-2">
              <a href="http://react-qiniu-avatar-upload.masongzhi.cn" target="_blank">
                示例
              </a>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="react-image-crop-upload">
            <Menu.Item key="2-2-1">
              <a href="https://github.com/masongzhi/react-image-crop-upload" target="_blank">
                <Icon type="github" />
                仓库
              </a>
            </Menu.Item>
            <Menu.Item key="2-2-2">
              <a href="http://react-image-crop-upload.masongzhi.cn" target="_blank">
                示例
              </a>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        {/*root账户登录后可以看到写作入口*/}
        {user &&
          user.role === 'root' && (
            <Menu.Item key="3">
              <Link to="/write">写作</Link>
            </Menu.Item>
          )}
      </Menu>
    );

    const PCMenu = () => <Col offset={2}>{BaseMenu}</Col>;

    const MobileMenu = () => (
      <div style={{ color: '#fff', backgroundColor: '#001529', padding: '0 20px' }}>
        <div className="mobileMenu" style={{ display: this.state.downVisible ? 'block' : 'none' }}>
          {BaseMenu}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icon
            type={this.state.downVisible ? 'up' : 'down'}
            theme="outlined"
            onClick={this.toggleDownVisible.bind(this)}
          />
        </div>
      </div>
    );

    return (
      <Router>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Row type="flex" justify="space-between" style={{ color: '#fff' }}>
              <Row type="flex" style={{ flex: 1 }}>
                <Col>
                  <Link to="/article">MASONGZHI`s blog</Link>
                </Col>
                {isPC && <PCMenu />}
              </Row>
              <Row>
                {user ? (
                  <span>{user.username}</span>
                ) : (
                  <Button onClick={this.showModal.bind(this)} ghost>
                    登录
                  </Button>
                )}
              </Row>
              <Row type="flex" align="middle" style={{ fontSize: '23px', marginLeft: '20px' }}>
                <a href="https://github.com/masongzhi" target="_blank" rel="noopener noreferrer">
                  <Icon type="github" theme="outlined" />
                </a>
              </Row>
            </Row>
          </Header>
          {!isPC && <MobileMenu />}
          <Row type="flex" justify="center">
            <Col lg={13} md={15} sm={20} xs={23}>
              <BackTop />
              <Content>
                <MyBreadcrumb />
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                  <Switch>
                    <Redirect exact from="/" to="/article" />
                    <Route path="/article/:id" component={Article} />
                    <Route path="/article" component={ArticleList} />
                    <Route path="/write/:articleId" component={Write} />
                    <Route path="/write" component={Write} />
                  </Switch>
                </div>
              </Content>
            </Col>
          </Row>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2016 Created by Ant UED</Footer>
          <Login
            visible={this.state.visible}
            showModal={this.showModal}
            login={this.login}
            register={this.register}
            handleCancel={this.handleCancel}
          />
        </Layout>
      </Router>
    );
  }
}

export default Home;
