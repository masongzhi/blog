import { fetchArticle } from '../../api';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Row, Divider, Button } from 'antd';
import * as ReactMarkdown from 'react-markdown';
import './markdown.css';
import Comment from './components/Comment';
import { connect } from 'react-redux';

import hljs from 'highlight.js/lib/highlight';

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
    };
  }

  async fetchArticle() {
    const response = await fetchArticle({
      articleId: this.props.match.params.id,
    });
    this.setState({
      article: response,
    });
  }

  updateHighlightBlock() {
    document.querySelectorAll('pre code').forEach(block => {
      hljs.highlightBlock(block);
    });
  }

  async componentDidMount() {
    await this.fetchArticle();
    this.updateHighlightBlock();
  }

  render() {
    const { article } = this.state;
    const { user } = this.props;
    return (
      <div>
        <Row type="flex" justify="space-between">
          <h2>{article.title}</h2>
          {article.author &&
            user &&
            article.author.username === user.username && (
              <Link
                to={{
                  pathname: `/write/${article.id}`,
                  article,
                }}
              >
                <Button shape="circle" icon="edit" />
              </Link>
            )}
        </Row>
        <ReactMarkdown ref={this.codeNode} className="markdown-body" source={article.content} />
        <Divider orientation="left">评论</Divider>
        <Comment articleId={this.props.match.params.id} />
      </div>
    );
  }
}
export default connect(mapStateToProps)(withRouter(Article));
