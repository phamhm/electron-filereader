'use babel';
import TYPES from './ACTION_TYPES';
import { knex } from '../index';

export function readFileLine(lines){
  return {
    type: TYPES.FILE_READ,
    payload: lines
  };
}

export function selectLine(line){
  return {
    type: TYPES.SELECT_LINE,
    payload: line
  };
}

export function createPost(comment, issueId, issueDesc=''){

  knex('ISSUE').insert({id:issueId, description: issueDesc})
    .catch((err) => console.log(err))
    .return();

  const payload = knex('COMMENTS').insert({comment, 'issue-id': issueId})
        .then(() => {
          return knex('COMMENTS').where('issue-id', issueId).then((val) => val);
        });

  return {
    type: TYPES.CREATE_COMMENT,
    payload: payload
  };
}


export function getComments(issueId){
  const payload = knex('COMMENTS').where('issue-id', issueId)
        .then((values) => values);

  return {
    type: TYPES.GET_COMMENTS,
    payload: payload
  };
}

export function deleteComment(issueId, commentId){
  const payload = knex('COMMENTS').where('id', commentId).del()
        .then(() => knex('COMMENTS').where('issue-id', issueId).then((vals) => vals));

  return {
    type: TYPES.DELETE_COMMENT,
    payload: payload
  };
}

export function updateComment(issueId, commentId, newComment){
  const payload = knex('COMMENTS').where('id', commentId)
        .update({comment: newComment})
        .then(() => knex('COMMENTS').where('issue-id', issueId).then((vals) => vals));

  return {
    type: TYPES.UPDATE_COMMENT,
    payload: payload
  };
}

export function setDb(knex){
  return {
    type: TYPES.SET_DB,
    payload: knex
  };
}

export function showCommentBox(toShow){
  return  {
    type: TYPES.SHOW_COMMENT_BOX,
    payload: toShow
  };
}

export function searchText(text, lines){
  let payload;

  if (!text)
    payload = null;
  else
    payload = lines.filter((line) => line.indexOf(text) != -1);

  return {
    type: TYPES.SEARCH_TEXT,
    payload: payload
  };
}
