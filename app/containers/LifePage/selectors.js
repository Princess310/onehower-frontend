import { createSelector } from 'reselect';

/**
 * Direct selector to the lifePage state domain
 */
const selectLifePageDomain = () => (state) => state.get('lifePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LifePage
 */

const makeSelectLifePage = () => createSelector(
  selectLifePageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectLifePage;
export {
  selectLifePageDomain,
};
