import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";

import {Breadcrumb} from 'antd';

// const breadcrumbNameMap = {
//   '/article/:id': 'id',
//   '/article': 'article',
//   '/write': 'write'
// };
class MyBreadcrumb extends Component {
  render () {
    const {location} = this.props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const length = pathSnippets.length;
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          {index !== (length - 1) ? (
            <Link to={url}>{pathSnippets[index]}</Link>
          ) : (
            pathSnippets[index]
          )}
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [(
      <Breadcrumb.Item key="home">
        <Link to="/" >Home</Link>
      </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);
    return (
      <Breadcrumb style={{margin: '16px 0'}}>
        {breadcrumbItems}
      </Breadcrumb>
    )
  }
}

export default withRouter(MyBreadcrumb);
