import React, { Component } from 'react';
import { List, Avatar, Icon } from 'antd';
import {Link} from "react-router-dom";
const ReactMarkdown = require('react-markdown')

const pagination = {
  pageSize: 10,
  current: 1,
  onChange: (() => {}),
};

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class ArticleList extends Component {
  render() {
    return(
      <List
        itemLayout="vertical"
        size="large"
        pagination={{...pagination, total: this.props.total}}
        dataSource={this.props.article}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={
                <Link to={{
                  pathname: `article/${item.id}`,
                  id: item.id
                }}>
                  {item.title}
              </Link>}
              description={item.label}
            />
            <div style={{ position: "relative", maxHeight: "40vh", overflow: "hidden" }}>
              <ReactMarkdown source={item.content} />
            </div>
          </List.Item>
        )}
      />
    )
  }
}
export default ArticleList;
