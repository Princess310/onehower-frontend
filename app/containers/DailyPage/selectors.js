import { createSelector } from 'reselect';

/**
 * Direct selector to the dailyPage state domain
 */
const selectDailyPageDomain = () => (state) => state.get('dailyPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by DailyPage
 */

const makeSelectDailyPage = () => createSelector(
  selectDailyPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectDailyPage;
export {
  selectDailyPageDomain,
};
