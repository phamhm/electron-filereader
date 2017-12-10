'use babel';

import { combineReducers } from 'redux';
import filereaderReducers from './filereader-app/reducer';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  ...filereaderReducers,
  form: formReducer
});
