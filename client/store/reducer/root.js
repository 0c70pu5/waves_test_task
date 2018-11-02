import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import user from 'layers/app/list/reducer';

const reducers = {
  form,
  user
};

export default combineReducers(reducers);
