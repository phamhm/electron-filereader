'use babel';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {deleteComment} from '../actions';
import CommentUpdater from './CommentUpdater';
import TODOS from '../../TODOS';

class CommentDetail extends Component{
  constructor(props){
    super(props);
    this.state={showUpdate:false};
  }

  showUpdateToggle(){
    this.setState({showUpdate: !this.state.showUpdate});
  }

  showUpdater(comment, todo){
    const color = TODOS[todo] ? TODOS[todo] : 'white',
          action = todo ? <span style={{color:color}}>{todo.toUpperCase()}:</span> : null;

    if (this.state.showUpdate)
      return (
        <CommentUpdater
          toggler={this.showUpdateToggle.bind(this)}
          comment={this.props.comment}
          issueId={this.props.issueId}/>
      );
    else
      return (
        <p>
          {action}
          {comment}
        </p>);
  }

  render(){
    const {comment, todo, id: commentId, created_at:submit_date} = this.props.comment;
    const { issueId } = this.props;

    return (
      <div>
        <div className="comment-text">
          <hr/>
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
          <br/>
          {this.showUpdater(comment, todo)}
        </div>
      </div>
    );
  }
}

export default connect(null, {deleteComment})(CommentDetail);
