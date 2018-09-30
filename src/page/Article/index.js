import { fetchArticle } from '../../api';
import React, { Component } from 'react';
import { Row, message } from 'antd';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true,
    });
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
        <div
          dangerouslySetInnerHTML={{
            __html: this.converter.makeHtml(this.state.content),
          }}
        />
      </div>
    );
  }
}
export default Article;
