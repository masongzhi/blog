import React, { Component } from 'react';
import { List, Avatar, Icon, Pagination, Row, message } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import Truncate from 'react-truncate';
import { getFormatTime } from '../../utils/dateUtils';
import { fetchArticles, addArticleLC, subArticleLC } from '../../api';
import './list.less';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';

const IconText = ({ type, text, onClick }) => (
  <span onClick={onClick}>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class ArticleList extends Component {
  state = {
    article: [],
    total: 0,
    current: 1,
  };

  converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  onPageChange = async (page, pageSize) => {
    await this.fetchArticles(page, pageSize);
    window.scrollTo(0, 0);
  };

  fetchArticles = async (page = 1, pageSize) => {
    try {
      this.setState({ current: page });
      const response = await fetchArticles({
        query: { page, limit: pageSize },
      });
      this.setState({
        article: response.docs,
        total: response.total,
      });
    } catch (e) {
      message.error(e.message);
    }
  };

  setArticleLVC = async (item, type) => {
    if (!this.state['like' + item.id]) {
      await addArticleLC({
        body: {
          articleId: item.id,
          type,
        },
      });
      this.addLikes(item.id);
    } else {
      await subArticleLC({
        body: {
          articleId: item.id,
          type,
        },
      });
      this.subLikes(item.id);
    }
    this.setState({ ['like' + item.id]: !this.state['like' + item.id] });
  };

  addLikes(id) {
    let one = this.state.article.find(item => item.id === id);
    ++one.likes;
  }

  subLikes(id) {
    let one = this.state.article.find(item => item.id === id);
    --one.likes;
  }

  async componentDidMount() {
    await this.fetchArticles();
    this.state.article.forEach(item => {
      this.setState({ ['like' + item.id]: false });
    });
  }

  render() {
    return (
      <div>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={this.state.article}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <IconText
                  type={this.state['like' + item.id] ? 'like' : 'like-o'}
                  onClick={e => this.setArticleLVC(item, 'likes')}
                  text={item.likes}
                />,
                <IconText type="message" text="0" />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={
                  <div>
                    <span className="list-time">{getFormatTime(item.time)}</span>
                    <Link
                      to={{
                        pathname: `article/${item.id}`,
                        id: item.id,
                      }}
                    >
                      <h3 className="list-title">{item.title}</h3>
                    </Link>
                  </div>
                }
                description={item.label}
              />
              <div>
                <Truncate lines={3}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.converter.makeHtml(item.summary),
                    }}
                  />
                </Truncate>
              </div>
            </List.Item>
          )}
        />
        <Row type="flex" justify="center">
          <Pagination
            current={this.state.current}
            total={this.state.total}
            onChange={this.onPageChange}
          />
        </Row>
      </div>
    );
  }
}

export default withRouter(ArticleList);
