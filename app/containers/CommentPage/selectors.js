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

const makeSelectCommentPage = () => createSelector(
  selectCommentPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectCommentPage;
export {
  selectCommentPageDomain,
};
