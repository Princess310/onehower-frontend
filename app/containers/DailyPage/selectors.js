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

const makeSelectDailyList = () => createSelector(
  selectDailyPageDomain(),
  (substate) => {
    const info = substate.get('moment');
    return {
      list: info.get('list'),
      page: info.get('page'),
      hasNext: info.get('hasNext'),
      loading: info.get('loading'),
    };
  },
);

export {
  makeSelectDailyList,
};
