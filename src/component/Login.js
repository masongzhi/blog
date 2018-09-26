import React, { Component } from 'react';
import { Modal, Form, Icon, Input, Button, Checkbox, Row } from 'antd';

const FormItem = Form.Item;

class NormalLoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.handleOk(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          {/*<a className="login-form-forgot" href="">*/}
          {/*Forgot password*/}
          {/*</a>*/}
          <Row>
            <Button block type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Row>
          {/*Or <a href="">register now!</a>*/}
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { visible, handleOk, handleCancel } = this.props;
    return (
      <Modal title="登录" width={400} visible={visible} footer={null} onCancel={handleCancel}>
        <WrappedNormalLoginForm handleOk={handleOk} />
      </Modal>
    );
  }
}
