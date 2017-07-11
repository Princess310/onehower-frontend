/*
 *
 * MomentDetail reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_MOMENT_DETAIL,
} from './constants';

const initialState = fromJS({});

function momentDetailReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MOMENT_DETAIL: {
      const { data } = action.payload;

      return state.set('detail', data);
    }
    default:
      return state;
  }
}

export default momentDetailReducer;
