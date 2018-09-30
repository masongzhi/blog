/*eslint-disable import/first*/

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import './index.less';
import Loadable from 'react-loadable';

import { Layout, Menu, Row, Col, BackTop, Button, Icon } from 'antd';
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
import { fetchArticles, login, register } from '../../api';
import { message } from 'antd';
import { isPC } from '../../utils/device';

const { Header, Content, Footer } = Layout;

class Home extends Component {
  state = {
    collapsed: false,
    article: [],
    total: 0,
    current: 1,
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

  fetchArticles = async (page = 1, pageSize) => {
    try {
      this.setState({ current: page });
      const response = await fetchArticles({
        query: { page, limit: pageSize },
      });
      this.setState({ article: response.docs });
      this.setState({ total: response.total });
    } catch (e) {
      message.error(e.message);
    }
  };

  addLikes(id) {
    let one = this.article.find(item => item.id === id);
    ++one.likes;
  }

  subLikes(id) {
    let one = this.article.find(item => item.id === id);
    --one.likes;
  }

  componentDidMount() {
    this.fetchArticles();
  }

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
        {/*root账户登录后可以看到写作入口*/}
        {user &&
          user.role === 'root' && (
            <Menu.Item key="2">
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
            onClick={this.toggleDownVisible}
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
                  <Button onClick={this.showModal} ghost>
                    登录
                  </Button>
                )}
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
                    <Route
                      path="/article"
                      component={() => (
                        <ArticleList
                          article={this.state.article}
                          total={this.state.total}
                          current={this.state.current}
                          fetchArticles={this.fetchArticles}
                          addLikes={this.addLikes}
                          subLikes={this.subLikes}
                        />
                      )}
                    />
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
