import React, { Component } from 'react';
import { replyComment, getCommentById } from '../../../api/index';
import { getTimeFromNow, getFormatTime } from '../../../utils/dateUtils';
import './NestComment.css';
import NestReplyComment from './NestReplyComment';

import { Comment, Tooltip, Input, Button, Row, Col } from 'antd';

const { TextArea } = Input;

const Reply = props => (
  <Row type="flex" justify="center" align="bottom" gutter={16}>
    <Col style={{ flex: 1, marginTop: '20px' }}>
      <TextArea
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

class NestComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replyVisible: false,
      content: '',
      comment: null, // 组件自身的comment，用于提交回复后渲染
    };
  }

  async comment(comment) {
    await replyComment({
      body: {
        commentId: comment.id,
        content: this.state.content,
        replyAuthor: comment.author,
      },
    });
    this.setState({
      content: '',
      replyVisible: false,
    });
    await this.getCommentById(comment.id);
  }

  async getCommentById(commentId) {
    const comment = await getCommentById(null, commentId);
    this.setState({
      comment,
    });
  }

  changeContent(e) {
    // 用setState会闪烁写不进textarea
    this.state.content = e.target.value;
  }

  toggleReplyVisible() {
    this.setState({
      replyVisible: !this.state.replyVisible,
    });
  }

  render() {
    const NestReply = props => (
      <div>
        <span onClick={this.toggleReplyVisible.bind(this)} className="nestCommentReplyBtn">
          {this.state.replyVisible && '取消'}
          回复
        </span>
        {this.state.replyVisible && (
          <Reply
            autosize={{ maxRows: 3 }}
            changeContent={this.changeContent.bind(this)}
            comment={() => this.comment.call(this, props.comment)}
          />
        )}
      </div>
    );

    const comment = this.state.comment || this.props.comment;

    return (
      <Comment
        key={comment._id}
        actions={[<NestReply comment={comment} />]}
        author={comment.author.username}
        datetime={
          <Tooltip title={getFormatTime(comment.createdAt)}>
            <span>{getTimeFromNow(comment.createdAt)}</span>
          </Tooltip>
        }
        content={<p>{comment.content}</p>}
      >
        {comment.childComments.map(childComment => (
          <NestReplyComment
            key={childComment._id}
            comment={childComment}
            Reply={Reply}
            getCommentById={this.getCommentById.bind(this)}
          />
        ))}
      </Comment>
    );
  }
}

export default NestComment;
