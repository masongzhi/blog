import { fetchArticle } from "../../Api";
import { message } from "antd/lib/index";
import React, { Component } from "react";
import { addArticleLVC } from "../../Api";
import { Row } from "antd";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });
  }

  fetchArticle = () => {
    fetchArticle({
      id: this.props.match.params.id
    })
      .then(response => {
        this.setState({ title: response.title });
        this.setState({ content: response.content });
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  addArticleLVC = async type => {
    await addArticleLVC({
      body: {
        id: this.props.match.params.id,
        type
      }
    });
  };

  componentDidMount = async () => {
    await Promise.all([this.fetchArticle(), await this.addArticleLVC("views")]);
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
            __html: this.converter.makeHtml(this.state.content)
          }}
        />
      </div>
    );
  }
}
export default Article;
