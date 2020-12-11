import React from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router';
import {RouteComponentProps} from 'react-router-dom';

const Footer: React.FC<RouteComponentProps> = (props) => {
  if((/\/blogger\/create\/[a-zA-Z0-9]+$/g).test(props.location.pathname)) {
    return null;
  }
  return<Layout.Footer style={{backgroundColor: '#2196f3', color: 'white'}}>Footer</Layout.Footer>
}

export default withRouter(Footer);