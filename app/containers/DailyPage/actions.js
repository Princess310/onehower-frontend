/*
 *
 * DailyPage actions
 *
 */

import {
  FETCH_MOMENT_LIST,
  LOAD_MOMENT_LIST,
  LOAD_MOMENT_LIST_LOADING,
} from './constants';

export function fetchMomentList(page) {
  return {
    type: FETCH_MOMENT_LIST,
    payload: {
      page,
    },
  };
}

export function loadMomentList(list, page) {
  return {
    type: LOAD_MOMENT_LIST,
    payload: {
      list,
    },
  };
}

export function loadMomentListLoading(loading) {
  return {
    type: LOAD_MOMENT_LIST_LOADING,
    payload: {
      loading,
    },
  };
}
