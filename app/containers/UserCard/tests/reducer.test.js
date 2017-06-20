
import { fromJS } from 'immutable';
import userCardReducer from '../reducer';

describe('userCardReducer', () => {
  it('returns the initial state', () => {
    expect(userCardReducer(undefined, {})).toEqual(fromJS({}));
  });
});
