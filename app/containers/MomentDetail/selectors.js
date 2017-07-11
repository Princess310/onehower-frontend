import { createSelector } from 'reselect';

/**
 * Direct selector to the momentDetail state domain
 */
const selectMomentDetailDomain = () => (state) => state.get('momentDetail');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MomentDetail
 */

const makeSelectMomentDetail = () => createSelector(
  selectMomentDetailDomain(),
  (substate) => substate.get('detail'),
);

export {
  makeSelectMomentDetail,
};
