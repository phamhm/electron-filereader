'use babel';
//CommentBox.js
import React from 'react';
import { connect } from 'react-redux';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { showCommentBox } from '../actions';

function CommentBox({selectLine:{line}, showCommentBox}) {
  const b64= btoa(line);

  return (
    <div>
      <br/>
      <button onClick = { () => showCommentBox(false)}> x </button>
      <h2>{line}</h2>
      <CommentForm issueId={b64}/>
      <CommentList issueId={b64}/>
    </div>
  );
}

function mapStateToProps({selectLine}){
  return {selectLine};
}

export default connect(mapStateToProps, {showCommentBox})(CommentBox);
