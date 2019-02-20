import React, { Component } from 'react';
import { getComment, addComment } from '../../../api/index';
import NestComment from './NestComment';

import { Input, Row, Col, Button } from 'antd';
const { TextArea } = Input;

const Reply = props => (
  <Row type="flex" justify="center" align="bottom" gutter={16}>
    <Col style={{ flex: 1, marginTop: '20px' }}>
      <TextArea
        value={props.value}
        placeholder="写下你的评论..."
        autosize={props.autosize}
        onChange={props.changeContent}
      />
    </Col>
    <Col>
      <Button type="primary" onClick={props.comment}>
        发布
      </Button>
    </Col>
  </Row>
);

class CommentPart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      comments: [],
    };
  }

  async getComment() {
    const comments = await getComment({
      query: {
        articleId: this.props.articleId,
      },
    });
    this.setState({
      comments,
    });
  }

  async comment() {
    await addComment({
      body: {
        articleId: this.props.articleId,
        content: this.state.content,
      },
    });
    this.setState({
      content: '',
    });
    await this.getComment();
  }

  changeContent(e) {
    this.setState({
      content: e.target.value,
    });
  }

  async componentDidMount() {
    await this.getComment();
  }

  render() {
    return (
      <div>
        {this.state.comments.map(comment => (
          <NestComment key={comment.id} comment={comment} Reply={Reply} />
        ))}
        <Reply
          value={this.state.content}
          autosize={{ minRows: 2, maxRows: 6 }}
          changeContent={this.changeContent.bind(this)}
          comment={this.comment.bind(this)}
        />
      </div>
    );
  }
}
export default CommentPart;
