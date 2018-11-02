import {UPDATE_USER_LIST} from 'store/types';

export function getUsers() {
  return function (dispatch) {
    const users = JSON.parse(localStorage.getItem('users') || '{}');

    dispatch({
      type: UPDATE_USER_LIST,
      payload: users
    });
  };
}
