import React, { Component } from 'react';
import { Modal, Form, Icon, Input, Button, Checkbox, Row } from 'antd';
import Register from './Register';

const FormItem = Form.Item;

class LoginForm extends Component {
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
    const { changeShowMode } = this.props;

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
              登 录
            </Button>
          </Row>
          Or <a onClick={() => changeShowMode('register')}>register now!</a>
        </FormItem>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMode: 'login', // register: '注册', login: '登录'
    };
  }

  changeShowMode = val => {
    this.setState({ showMode: val });
  };

  handleCancel = e => {
    this.props.handleCancel(e);
    this.setState({ showMode: 'login' });
  };

  render() {
    const { visible, login, register } = this.props;
    const { showMode } = this.state;
    return (
      <Modal
        title={showMode === 'login' ? '登录' : '注册'}
        width={showMode === 'login' ? 400 : 500}
        visible={visible}
        footer={null}
        onCancel={this.handleCancel}
      >
        {showMode === 'login' ? (
          <WrappedLoginForm handleOk={login} changeShowMode={this.changeShowMode} />
        ) : (
          <Register handleOk={register} changeShowMode={this.changeShowMode} />
        )}
      </Modal>
    );
  }
}
