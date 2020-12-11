/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Row, Col, Button, Spin } from 'antd';
import BlogEditor from './BlogEditor/BlogEditor';
import BlogPreviewer from './Previewer/PreviewComponent';
import CreateBlogActions from '../../redux/actions/createBlogActions';
import { GetConnectDispatchPropsType } from '../../utils/actionCreators';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IHobbiestDenAppState } from '../../redux/reducers';
import { Dispatch, bindActionCreators } from 'redux';
import { ClockCircleOutlined } from '@ant-design/icons';

type TStateProps = ReturnType<typeof mapStateToProps>;
type TBindActionCreators = typeof CreateBlogActions;
type TDispatchProps = GetConnectDispatchPropsType<TBindActionCreators>;

type TAllProps = TStateProps & TDispatchProps & RouteComponentProps<{blogid: string}>;

const CreateBlogCotainer: React.FC<TAllProps> = (props) => {
  const blogid = props.match.params.blogid;

  useEffect(()=>{
      (async()=>{
        try {
          await props.fetchBlogById({blogId: blogid})
        } catch (error) {
          
        }
      })();
  },[blogid]);

  return (
    <>
    <Row>
      <Col span={18}>
        <div style={{boxShadow: 'rgba(0, 0, 0, 0.44) -5px -2px 6px 2px', padding: '5px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <b>Preview Pane</b>
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
          <div style={{marginRight: '10px'}}><ClockCircleOutlined /> {`Last Saved at ${new Date(props.createBlog.updatedAt || Date.now()).toLocaleTimeString()}`}</div>
          <Button type="primary" onClick={()=>props.history.push('/blogger')}>Done Editing</Button>
          </div>
        </div>
        { props.createBlog.data ? <BlogPreviewer /> : <Spin />}
      </Col>
      <Col span={6}>
        {
          props.createBlog.data ? <BlogEditor blogId={blogid} /> : <Spin />
        }
      </Col>
    </Row>
    </>
  );
}

const mapStateToProps = (state: IHobbiestDenAppState) => {
  return {
    createBlog: state.createBlog,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators<TBindActionCreators, TDispatchProps>(
    { ...CreateBlogActions },
    dispatch
  );

export default connect<TStateProps, TDispatchProps, {}, IHobbiestDenAppState>(
  mapStateToProps,
  mapDispatchToProps
)(CreateBlogCotainer);
