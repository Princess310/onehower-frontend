
import { fromJS } from 'immutable';
import commentPageReducer from '../reducer';

describe('commentPageReducer', () => {
  it('returns the initial state', () => {
    expect(commentPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
