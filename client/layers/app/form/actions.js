import objectToHash from 'object-hash';
import {SubmissionError, initialize} from 'redux-form';
import {push} from 'connected-react-router';
import {formNames} from 'constants/form';

export function saveUser(values) {
  return function (dispatch) {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const hash = objectToHash(values);
    if (users[hash]) {
      throw new SubmissionError({fullName: 'Пользователь уже существует'});
    }
    users[hash] = values;
    localStorage.setItem('users', JSON.stringify(users));
    dispatch(push('/'));
  };
}

export function getUserByHash(hash) {
  return function (dispatch) {
    const users = localStorage.getItem('users');
    if (!users[hash]) {
      dispatch(push('/'));
    }
    dispatch(initialize(formNames.USER_FORM, users[hash]));
  };
}


