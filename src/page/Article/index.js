import {fetchArticle} from "../../Api";
import {message} from "antd/lib/index";
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import {addArticleLVC} from '../../Api'
import { Button, Row } from 'antd';

class Article extends Component {
  state = {
    title: '',
    content: ''
  };

  fetchArticle = () => {
    fetchArticle({
      id: this.props.match.params.id
    }).then((respone) => {
      this.setState({title: respone.title});
      this.setState({content: respone.content});
    }).catch(error => {
      message.error(error.message);
    })
  };

  addArticleLVC = async (type) => {
    await addArticleLVC({
      body: {
        id: this.props.match.params.id,
        type
      }
    })
  }

  componentDidMount = async () => {
    await Promise.all([
      this.fetchArticle(),
      await this.addArticleLVC('views')
    ])
  };
  render() {
    return(
      <div>
        <Row type="flex" justify="space-between">
          <h2>{this.state.title}</h2>
          {/*<Button shape="circle" icon="edit"/>*/}
        </Row>
        <ReactMarkdown source={this.state.content} />
      </div>
    )
  }
}
export default Article;
