import React from 'react';
import { Row, Col } from 'antd';
import BlogEditor from './BlogEditor/BlogEditor';
import BlogPreviewer from './Previewer/PreviewComponent';

const CreateBlogCotainer = () => {
  return (
    <>
    <Row>
      <Col span={18}>
        <BlogPreviewer />
      </Col>
      <Col span={6}>
        <BlogEditor />
      </Col>
    </Row>
    </>
  );
}

export default CreateBlogCotainer;