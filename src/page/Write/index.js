import React, { Component } from 'react';
import ReactMde, { ReactMdeCommands } from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';

class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reactMdeValue: {text: '', selection: null},
    };
  }

  handleValueChange = (value) => {
    this.setState({reactMdeValue: value});
  }
  render() {
    return (
      <div className="container">
        <ReactMde
          textAreaProps={{
            id: 'ta1',
            name: 'ta1',
          }}
          value={this.state.reactMdeValue}
          onChange={this.handleValueChange}
        />
      </div>
    );
  }
}
export default Write;
