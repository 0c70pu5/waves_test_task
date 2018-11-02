import {
  UPDATE_USER_LIST
} from 'store/types';

export function getInitialState() {
  const list = [];

  return {
    list
  };
}

export default function (state = getInitialState(), {type, payload}) {
  switch (type) {
    case UPDATE_USER_LIST: {
      return {
        list: Object.keys(payload).map((hash) => ({hash, ...payload[hash]}))
      };
    }
    default: {
      return {...state};
    }
  }
}
