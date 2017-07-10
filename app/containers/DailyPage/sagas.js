import { take, cancel, put, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import {
  FETCH_MOMENT_LIST,
} from './constants';

import {
  loadMomentList,
  loadMomentListLoading,
} from './actions';

export function* fetchMomentList(action) {
  try {
    const { page } = action.payload;

    if (page > 1) {
      yield put(loadMomentListLoading(true));
    }
    const res = yield request.doGet('moment/list');

    // just response list for now
    yield put(loadMomentList(res));
  } catch (err) {
    // console.log(err);
  }
}
// Individual exports for testing
export function* defaultSaga() {
  const watcherList = yield takeLatest(FETCH_MOMENT_LIST, fetchMomentList);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherList);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
