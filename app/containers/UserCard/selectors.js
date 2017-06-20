import { createSelector } from 'reselect';

/**
 * Direct selector to the userCard state domain
 */
const selectUserCardDomain = () => (state) => state.get('userCard');

/**
 * Other specific selectors
 */


/**
 * Default selector used by UserCard
 */

const makeSelectUserCard = () => createSelector(
  selectUserCardDomain(),
  (substate) => null,
);

export default makeSelectUserCard;
export {
  selectUserCardDomain,
};
