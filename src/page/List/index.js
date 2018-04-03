import React, { Component } from 'react';
import { List, Avatar, Icon, Pagination, Row } from 'antd';
import {Link} from "react-router-dom";
const ReactMarkdown = require('react-markdown')

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class ArticleList extends Component {
  constructor(props) {
    super(props);
  }
  onPageChange = (page, pageSize) => {
    this.props.fetchArticles(page, pageSize)
    window.scrollTo(0, 0);
  }

  render() {
    return(
      <div>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={this.props.article}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[<IconText type="star-o" text="156"/>, <IconText type="like-o" text="156"/>,
                <IconText type="message" text="2"/>]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar}/>}
                title={
                  <Link to={{
                    pathname: `article/${item.id}`,
                    id: item.id
                  }}>
                    {item.title}
                  </Link>}
                description={item.label}
              />
              <div style={{position: "relative", maxHeight: "40vh", overflow: "hidden"}}>
                <ReactMarkdown source={item.content}/>
              </div>
            </List.Item>
          )}
        />
        <Row type="flex" justify="center">
          <Pagination total={this.props.total} onChange={this.onPageChange}/>
        </Row>
      </div>
    )
  }
}
export default ArticleList;
