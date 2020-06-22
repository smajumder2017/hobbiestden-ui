import React from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router';
import {RouteComponentProps} from 'react-router-dom';

const Footer: React.FC<RouteComponentProps> = (props) => {
  if(props.location.pathname === '/blogger/create') {
    return null;
  }
  return<Layout.Footer>Footer</Layout.Footer>
}

export default withRouter(Footer);