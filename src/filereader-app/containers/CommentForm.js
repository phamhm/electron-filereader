'use babel';
//CommentForm.js
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from '../actions';


//TODO: form is not being blanked out.

class CommentForm extends Component {
  renderFields(field){
    const {meta:{touched = null, error=null}} = field;
    const className =
          `form-group ${touched && error ? 'has-danger': ''}`;

    return (
      <div className={className}>
        <textarea className="form-control"
                  {...field.input}/>
        <div className="text-help">{touched? error:null}</div>
      </div>
    );
  }

  onSubmit({ comment }){
    const { issueId } = this.props;
    this.props.createPost(comment, issueId).then(() => this.props.reset());
  }

  render() {
    const {handleSubmit}= this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name="comment"
                 label="Comment"
                 component={this.renderFields}/>
          <button type="submit"
                  className="btn btn-primary">Add</button>
        </form>
      </div>
    );
  }
}

const connectedCommentForm = connect(null, {createPost})(CommentForm);

function validate(values){
  const errors = {};
  if (!values.comment)
    errors.comment="Comment can't be blank";

  return errors;
}
export default reduxForm({validate, form:"NewCommentForm"})(connectedCommentForm);
