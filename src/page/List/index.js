import React, { Component } from 'react';
import { List, Avatar, Icon, Pagination, Row } from 'antd';
import {Link} from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import * as DateUtils from '../../utils/dateUtils';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1
    }
  }
  onPageChange = (page, pageSize) => {
    this.setState({current: page})
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
                    <span style={{color: "#969696", paddingLeft: "10px", fontSize: "13px"}}>{DateUtils.getFormatTime(item.time)}</span>
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
          <Pagination current={this.state.current} total={this.props.total} onChange={this.onPageChange}/>
        </Row>
      </div>
    )
  }
}
export default ArticleList;
