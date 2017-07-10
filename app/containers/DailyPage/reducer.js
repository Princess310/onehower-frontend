/*
 *
 * DailyPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_MOMENT_LIST,
  LOAD_MOMENT_LIST_LOADING,
} from './constants';

const initialState = fromJS({
  moment: {
    list: false,
    hasNext: false,
    loading: false,
    page: 1,
  },
});

function dailyPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MOMENT_LIST: {
      const { list, page } = action.payload;
      const info = state.get("moment");
      const oldList = info.get("list");

      // TODO: check page info for list
      // const newList = list;

      const result = info.set('list', list)
        .set('hasNext', false)
        .set('loading', false)
        .set('page', 1);

      return state.set('moment', result);
    }
    default:
      return state;
  }
}

export default dailyPageReducer;
