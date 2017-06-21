
import { fromJS } from 'immutable';
import lifePageReducer from '../reducer';

describe('lifePageReducer', () => {
  it('returns the initial state', () => {
    expect(lifePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
