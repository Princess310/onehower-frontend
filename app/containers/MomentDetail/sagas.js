import { take, cancel, put, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import {
  FETCH_MOMENT_DETAIL,
} from './constants';

import {
  loadMomentDetail,
} from './actions';

export function* fetchMomentDetail(action) {
  try {
    const { id } = action.payload;

    const res = yield request.doGet(`moment/${id}`);

    // just response list for now
    yield put(loadMomentDetail(res));
  } catch (err) {
    // console.log(err);
  }
}

// Individual exports for testing
export function* defaultSaga() {
  const watchDetail = yield takeLatest(FETCH_MOMENT_DETAIL, fetchMomentDetail);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watchDetail);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
