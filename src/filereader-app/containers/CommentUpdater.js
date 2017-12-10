'use babel';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateComment} from '../actions';

class CommentUpdater extends Component{
  constructor(props){
    super(props);
    const comment =
          this.props.comment.comment ? this.props.comment.comment :'';
    this.state = {commentText:comment};
  }

  onUpdateChange(event){
    this.setState({commentText:event.target.value});
  }

  componentWillReceiveProps({comment:{comment:nextComment}}){
    nextComment = nextComment || '';

    if (nextComment !== this.state.commentText){
      this.setState({commentText:nextComment});
    }
  }

  handleUpdateComment(event){
    event.preventDefault();
    const { comment, id: commentId } = this.props.comment;
    const { issueId } = this.props;

    const newComment = this.state.commentText;
    if (newComment !== comment){
      this.props.updateComment(issueId, commentId, newComment);
      this.props.toggler();
    }
  }

  render(){
    return (
      <div className="update-comment">
        <form onSubmit={this.handleUpdateComment.bind(this)}>
          <textarea
            className="form-control"
            onChange={this.onUpdateChange.bind(this)}
            value={this.state.commentText}/>

          <button type="submit"
                  className="btn btn-default">
            <span aria-hidden="true">Update</span>
          </button>
        </form>
      </div>
    );
  }
}

export default connect(null, {updateComment})(CommentUpdater);
