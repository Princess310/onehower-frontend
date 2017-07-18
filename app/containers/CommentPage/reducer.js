/*
 *
 * CommentPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_MESSAGE_LIST,
  LOAD_MESSAGE_LIST_LOADING,

  ADD_MESSAGE,
} from './constants';

const initialState = fromJS({
  message: {
    list: false,
    hasNext: false,
    loading: false,
    page: 1,
  },
});

function commentPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MESSAGE_LIST: {
      const { list, page } = action.payload;
      const info = state.get("message");
      const oldList = info.get("list");

      // TODO: check page info for list
      // const newList = list;

      const result = info.set('list', list)
        .set('hasNext', false)
        .set('loading', false)
        .set('page', 1);

      return state.set('message', result);
    }
    case ADD_MESSAGE: {
      const { message } = action.payload;
      let info = state.get("message");
      const oldList = info.get('list');

      info = info.set('list', [
        message,
        ...oldList,
      ]);

      return state.set('message', info);
    }
    default:
      return state;
  }
}

export default commentPageReducer;
