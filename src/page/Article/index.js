import {fetchArticle} from "../../Api";
import {message} from "antd/lib/index";
import React, { Component } from 'react';
const ReactMarkdown = require('react-markdown')

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

  componentDidMount = () => {
    this.fetchArticle()
  };
  render() {
    return(
      <div>
        <h2>{this.state.title}</h2>
        <ReactMarkdown source={this.state.content} />
      </div>
    )
  }
}
export default Article;
