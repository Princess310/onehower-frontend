import { createSelector } from 'reselect';

/**
 * Direct selector to the commentPage state domain
 */
const selectCommentPageDomain = () => (state) => state.get('commentPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CommentPage
 */

const makeSelectMessageList = () => createSelector(
  selectCommentPageDomain(),
  (substate) => {
    const info = substate.get('message');
    return {
      list: info.get('list'),
      page: info.get('page'),
      hasNext: info.get('hasNext'),
      loading: info.get('loading'),
    };
  },
);

export {
  makeSelectMessageList,
};
