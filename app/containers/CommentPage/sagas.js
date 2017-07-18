import { take, cancel, put, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import {
  FETCH_MESSAGE_LIST,

  SEND_MESSAGE,
} from './constants';

import {
  loadMessageList,
  loadMessageListLoading,
  addMessage,
} from './actions';

export function* fetchMessageList(action) {
  try {
    const { page } = action.payload;

    if (page > 1) {
      yield put(loadMessageListLoading(true));
    }
    const res = yield request.doGet('message/list');

    // just response list for now
    yield put(loadMessageList(res));
  } catch (err) {
    // console.log(err);
  }
}

export function* sendMessage(action) {
  try {
    const { message } = action.payload;

    const res = yield request.doPost('message/add', {
      content: message,
    });

    yield put(addMessage(res));
  } catch (err) {
    // console.log(err);
  }
}

// Individual exports for testing
export function* defaultSaga() {
  const watcherList = yield takeLatest(FETCH_MESSAGE_LIST, fetchMessageList);
  const watcherSendMessage = yield takeLatest(SEND_MESSAGE, sendMessage);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherList);
  yield cancel(watcherSendMessage);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
