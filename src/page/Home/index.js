/*eslint-disable import/first*/

import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import "./index.less";
import Loadable from "react-loadable";

import { Layout, Menu, Row, Col, BackTop, Button } from "antd";
import Loading from "../../component/Loading";
const ArticleList = Loadable({
  loader: () => import("../List"),
  loading: Loading
});
const Article = Loadable({
  loader: () => import("../Article"),
  loading: Loading
});
const Write = Loadable({
  loader: () => import("../Write"),
  loading: Loading
});
const MyBreadcrumb = Loadable({
  loader: () => import("../../component/MyBreadcrumb"),
  loading: Loading
});
const Login = Loadable({
  loader: () => import("../../component/Login"),
  loading: Loading
});
import { fetchArticles } from "../../Api";
import { message } from "antd/lib/index";

const { Header, Content, Footer } = Layout;

class Home extends Component {
  state = {
    collapsed: false,
    article: [],
    total: 0,
    current: 1,
    visible: false
  };

  // login组件用
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
    // TODO 请求登录接口
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  fetchArticles = async (page = 1, pageSize) => {
    try {
      this.setState({ current: page });
      const response = await fetchArticles({
        query: { page, limit: pageSize }
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

  render() {
    return (
      <Router>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Row type="flex" justify="space-between" style={{ color: "#fff" }}>
              <Row type="flex" style={{ flex: 1 }}>
                <Col>
                  <Link to="/article">MASONGZHI`s blog</Link>
                </Col>
                <Col offset={2}>
                  <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["1"]}
                    style={{ lineHeight: "64px" }}
                  >
                    <Menu.Item key="1">
                      <Link to="/article">文章</Link>
                    </Menu.Item>
                  </Menu>
                </Col>
              </Row>
              <Col>
                <Button onClick={this.showModal} ghost>
                  登录
                </Button>
              </Col>
              {/*<Row type="flex" justify="end" style={{flex: 1}}>*/}
              {/*<Col style={{ color: "#fff" }}>*/}
              {/*<Link to="/write">*/}
              {/*<Button type="primary">*/}
              {/*<Icon type="edit"/>*/}
              {/*<span>写作区</span>*/}
              {/*</Button>*/}
              {/*</Link>*/}
              {/*</Col>*/}
              {/*</Row>*/}
            </Row>
          </Header>
          <Row type="flex" justify="center">
            <Col lg={13} md={15} sm={20} xs={23}>
              <BackTop />
              <Content>
                <MyBreadcrumb />
                <div
                  style={{ background: "#fff", padding: 24, minHeight: 280 }}
                >
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
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
          <Login
            visible={this.state.visible}
            showModal={this.showModal}
            handleOk={this.handleOk}
            handleCancel={this.handleCancel}
          />
        </Layout>
      </Router>
    );
  }
}

export default Home;
