import React, { Component } from 'react';
import ReactMde  from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { Button, Input, Row, message } from 'antd';
import {saveArticle} from '../../Api'

class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reactMdeValue: {text: '', selection: null},
      title: '',
      content: ''
    };
  }

  handleValueChange = (value) => {
    this.setState({reactMdeValue: value});
  };
  handleTitleValChange = (e) => {
    const { value } = e.target
    this.setState({title: value});
  };
  handleCommit = () => {
    saveArticle({
      body: {
        title: this.state.title,
        time: new Date().getTime(),
        content: this.state.reactMdeValue.text
      }
    }).then((respone) => {
      message.success('写入数据成功')
    }).catch(error => {
      message.error(error.message);
    })
  };
  render() {
    return (
      <div className="container">
        <Row style={{marginBottom: '10px'}}>
          <Input placeholder="标题" value={this.state.title} onChange={this.handleTitleValChange}/>
        </Row>
        <ReactMde
          textAreaProps={{
            id: 'ta1',
            name: 'ta1',
          }}
          value={this.state.reactMdeValue}
          onChange={this.handleValueChange}
        />
        <Button type="primary" onClick={this.handleCommit}>提交</Button>
      </div>
    );
  }
}
export default Write;
