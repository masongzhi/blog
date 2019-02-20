import React, { Component } from 'react';
import { getTimeFromNow, getFormatTime } from '../../../utils/dateUtils';

import { Comment, Tooltip } from 'antd';
import { replyComment } from '../../../api';

class NestComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replyVisible: false,
      content: '',
    };
  }

  async comment(comment) {
    await replyComment({
      body: {
        commentId: comment.commentId,
        content: this.state.content,
        replyAuthor: comment.author,
      },
    });
    this.setState({
      content: '',
      replyVisible: false,
    });
    await this.props.getCommentById(comment.commentId);
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
          <this.props.Reply
            autosize={{ maxRows: 3 }}
            changeContent={this.changeContent.bind(this)}
            comment={() => this.comment.call(this, props.comment)}
          />
        )}
      </div>
    );

    const { comment } = this.props;
    return (
      <Comment
        actions={[<NestReply comment={comment} />]}
        author={comment.author.username + ' 回复 ' + comment.replyAuthor.username}
        datetime={
          <Tooltip title={getFormatTime(comment.createdTime)}>
            <span>{getTimeFromNow(comment.createdTime)}</span>
          </Tooltip>
        }
        content={<p>{comment.content}</p>}
      />
    );
  }
}

export default NestComment;
