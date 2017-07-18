/*
 *
 * CommentPage actions
 *
 */

import {
  FETCH_MESSAGE_LIST,
  LOAD_MESSAGE_LIST,
  LOAD_MESSAGE_LIST_LOADING,

  SEND_MESSAGE,
  ADD_MESSAGE,
} from './constants';

export function fetchMessageList(page) {
  return {
    type: FETCH_MESSAGE_LIST,
    payload: {
      page,
    },
  };
}

export function loadMessageList(list, page) {
  return {
    type: LOAD_MESSAGE_LIST,
    payload: {
      list,
    },
  };
}

export function loadMessageListLoading(loading) {
  return {
    type: LOAD_MESSAGE_LIST_LOADING,
    payload: {
      loading,
    },
  };
}

export function sendMessage(message) {
  return {
    type: SEND_MESSAGE,
    payload: {
      message,
    },
  };
}

export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    payload: {
      message,
    },
  };
}
