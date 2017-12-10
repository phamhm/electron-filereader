'use babel';

import TYPES from './ACTION_TYPES';

function db(state = null, action){
  switch(action.type){
  case TYPES.SET_DB:
    return action.payload;
  default:
    return state;
  }

}

function fileLines(state = [], action){
  switch(action.type){
  case TYPES.FILE_READ:
    return [...action.payload];
  default:
    return state;
  }
}

function selectLine(state = {}, action){
  switch(action.type){
  case TYPES.SELECT_LINE:
    return {line:action.payload,
            line64: btoa(action.payload)};
  default:
    return state;
  }
}

function comments(state = [], action){

  switch(action.type){
  case TYPES.GET_COMMENTS:
    return action.payload ? [...action.payload] : [];
  case TYPES.CREATE_COMMENT:
    return action.payload ? [...action.payload]:[];
  case TYPES.DELETE_COMMENT:
    return action.payload ? [...action.payload]:[];
  case TYPES.UPDATE_COMMENT:
    return action.payload ? [...action.payload]:[];
  default:
    return state;
  }
}

function showCommentBox(state = false,  action){
  if (action.type === TYPES.SHOW_COMMENT_BOX)
    return action.payload;
  else
    return state;

}

export default {fileLines, selectLine, comments, db, showCommentBox};
