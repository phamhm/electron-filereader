'use babel';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {selectLine, getComments, showCommentBox} from '../actions';

class LineDisplayer extends Component{
  handleClick(){
    const base64 = btoa(this.props.line);
    this.props.getComments(base64);
    this.props.selectLine(this.props.line);
    this.props.showCommentBox(true);
  }

  render(){
    return (
      <pre onClick={this.handleClick.bind(this)}>{this.props.line}</pre>
    );
  }
}

export default connect(null, {selectLine, getComments, showCommentBox})(LineDisplayer);
