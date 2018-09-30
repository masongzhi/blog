import { fetchArticle } from '../../api';
import React, { Component } from 'react';
import { Row } from 'antd';
import * as ReactMarkdown from 'react-markdown';
import '../../markdown.css';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };
  }

  fetchArticle = async () => {
    const response = await fetchArticle({
      articleId: this.props.match.params.id,
    });
    this.setState({
      title: response.title,
      content: response.content,
    });
  };

  componentDidMount = async () => {
    await this.fetchArticle();
  };
  render() {
    return (
      <div>
        <Row type="flex" justify="space-between">
          <h2>{this.state.title}</h2>
          {/*<Button shape="circle" icon="edit"/>*/}
        </Row>
        <ReactMarkdown className="markdown-body" source={this.state.content} />
      </div>
    );
  }
}
export default Article;
