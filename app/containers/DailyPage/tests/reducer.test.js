
import { fromJS } from 'immutable';
import dailyPageReducer from '../reducer';

describe('dailyPageReducer', () => {
  it('returns the initial state', () => {
    expect(dailyPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
