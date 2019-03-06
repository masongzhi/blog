import React, { Component } from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { Button, Input, Row, message } from 'antd';
import { saveArticle, updateArticle } from '../../api';
import { withRouter } from 'react-router-dom';

class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      value: '',
    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true,
    });
  }

  handleValueChange = value => {
    this.setState({ value });
  };
  handleTitleValChange = e => {
    const { value } = e.target;
    this.setState({ title: value });
  };
  handleCommit = async () => {
    const articleId = this.props.match.params.articleId;
    if (articleId) {
      await updateArticle({
        body: {
          title: this.state.title,
          content: this.state.value,
          articleId,
        },
      });
    } else {
      await saveArticle({
        body: {
          title: this.state.title,
          content: this.state.value,
        },
      });
    }

    message.success('写入数据成功，即将跳转到文章列表');
    setTimeout(() => this.props.history.push('/article'), 1000);
  };
  componentDidMount() {
    const { article } = this.props.location;
    if (article) {
      this.setState({
        title: article.title,
        value: article.content,
      });
    }
  }
  render() {
    return (
      <div className="container">
        <Row style={{ marginBottom: '10px' }}>
          <Input placeholder="标题" value={this.state.title} onChange={this.handleTitleValChange} />
        </Row>
        <ReactMde
          onChange={this.handleValueChange}
          value={this.state.value}
          generateMarkdownPreview={markdown => Promise.resolve(this.converter.makeHtml(markdown))}
        />
        <Button type="primary" style={{ marginTop: '10px' }} onClick={this.handleCommit}>
          提交
        </Button>
      </div>
    );
  }
}
export default withRouter(Write);
