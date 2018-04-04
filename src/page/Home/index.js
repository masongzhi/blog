import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";
import './index.css';

import {Layout, Menu, Icon, Row, Col, Button} from 'antd';
import ArticleList from '../List';
import Article from '../Article';
import Write from '../Write';
import MyBreadcrumb from '../../Component/MyBreadcrumb'
import {fetchArticles} from "../../Api";
import {message} from "antd/lib/index";

const {Header, Content, Footer} = Layout;

class Home extends Component {
  state = {
    collapsed: false,
    article: [],
    total: 0
  };
  onCollapse = (collapsed) => {
    this.setState({collapsed});
  }
  fetchArticles = (page, pageSize) => {
    fetchArticles({
      query: {page, limit: pageSize}
    }).then((respone) => {
      this.setState({article: respone.docs});
      this.setState({total: respone.total});
    }).catch(error => {
      message.error(error.message);
    })
  };

  componentDidMount = () => {
    this.fetchArticles()
  };

  render() {
    return (
      <Router>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Row type="flex" justify="start">
              <Col style={{ color: "#fff" }}>MASONGZHI`s blog</Col>
              <Col offset={2}>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['1']}
                  style={{ lineHeight: '64px' }}
                >
                  <Menu.Item key="1">
                    <Link to="/article">
                      文章
                    </Link>
                  </Menu.Item>
                  {/*<Menu.Item key="2">nav 2</Menu.Item>*/}
                </Menu>
              </Col>
              <Row type="flex" justify="end" style={{flex: 1}}>
                <Col style={{ color: "#fff" }}>
                  <Link to="/write">
                    <Button type="primary">
                      <Icon type="edit"/>
                      <span>写作区</span>
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Row>
          </Header>
          <Row type="flex" justify="center">
            <Col lg={12} md={15} sm={20} xs={23}>
              <Content>
                <MyBreadcrumb />
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                  <Switch>
                    <Redirect exact from='/' to='/article'/>
                    <Route path="/article/:id" component={Article} />
                    <Route path="/article" component={() => <ArticleList article={this.state.article} total={this.state.total} fetchArticles={this.fetchArticles} />} />
                    <Route path="/write" component={Write} />
                  </Switch>
                </div>
              </Content>
            </Col>
          </Row>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default Home;
