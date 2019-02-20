import { fetchArticle } from '../../api';
import React, { Component } from 'react';
import { Row, Divider } from 'antd';
import * as ReactMarkdown from 'react-markdown';
import './markdown.css';
import Comment from './components/Comment';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };
  }

  async fetchArticle() {
    const response = await fetchArticle({
      articleId: this.props.match.params.id,
    });
    this.setState({
      title: response.title,
      content: response.content,
    });
  }

  async componentDidMount() {
    await this.fetchArticle();
  }

  render() {
    return (
      <div>
        <Row type="flex" justify="space-between">
          <h2>{this.state.title}</h2>
          {/*<Button shape="circle" icon="edit"/>*/}
        </Row>
        <ReactMarkdown className="markdown-body" source={this.state.content} />
        <Divider orientation="left">评论</Divider>
        <Comment articleId={this.props.match.params.id} />
      </div>
    );
  }
}
export default Article;
