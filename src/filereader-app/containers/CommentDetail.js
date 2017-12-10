'use babel';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {deleteComment} from '../actions';
import CommentUpdater from './CommentUpdater';

class CommentDetail extends Component{
  constructor(props){
    super(props);
    this.state={showUpdate:false};
  }

  showUpdateToggle(){
    this.setState({showUpdate: !this.state.showUpdate});
  }

  showUpdater(comment){
    if (this.state.showUpdate)
      return (
        <CommentUpdater
          toggler={this.showUpdateToggle.bind(this)}
          comment={this.props.comment}
          issueId={this.props.issueId}/>
      );
    else
      return <p>{comment}</p>;
  }

  render(){
    const {comment, id: commentId, created_at:submit_date} = this.props.comment;
    const { issueId } = this.props;

    return (
      <div>
        <div className="comment-text">
          <button type="button"
                  onClick={() => this.props.deleteComment(issueId, commentId)}
            className="btn btn-default">

            <span aria-hidden="true">×</span>

          </button>

          <button type="button"
                  onClick={this.showUpdateToggle.bind(this)}
            className="btn btn-default">
            <span aria-hidden="true">u</span>
          </button>

          on: {submit_date}

          {this.showUpdater(comment)}
        </div>
      </div>
    );
  }
}

export default connect(null, {deleteComment})(CommentDetail);
