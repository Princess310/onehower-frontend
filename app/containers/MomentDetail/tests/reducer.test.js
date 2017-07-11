
import { fromJS } from 'immutable';
import momentDetailReducer from '../reducer';

describe('momentDetailReducer', () => {
  it('returns the initial state', () => {
    expect(momentDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
});
