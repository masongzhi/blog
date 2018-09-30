import React, { Component } from 'react';
import { List, Avatar, Icon, Pagination, Row } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import Truncate from 'react-truncate';
import { getFormatTime } from '../../utils/dateUtils';
import { addArticleLVC, subArticleLVC } from '../../api';
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
  constructor(props) {
    super(props);
    this.state = {};
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true,
    });
  }
  onPageChange = async (page, pageSize) => {
    await this.props.fetchArticles(page, pageSize);
    window.scrollTo(0, 0);
  };

  setArticleLVC = async (item, type) => {
    if (!this.state['like' + item.id]) {
      await addArticleLVC({
        body: {
          id: item.id,
          type,
        },
      });
      this.props.addLikes(item.id);
    } else {
      await subArticleLVC({
        body: {
          id: item.id,
          type,
        },
      });
      this.props.subLikes(item.id);
    }
    this.setState({ ['like' + item.id]: !this.state['like' + item.id] });
  };

  componentDidMount() {
    this.props.article.forEach(item => {
      this.setState({ ['like' + item.id]: false });
    });
  }

  render() {
    return (
      <div>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={this.props.article}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <IconText type="eye-o" text={item.views} />,
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
            current={this.props.current}
            total={this.props.total}
            onChange={this.onPageChange}
          />
        </Row>
      </div>
    );
  }
}

export default withRouter(ArticleList);
