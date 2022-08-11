import { searchTrackContainerReducer, searchTrackContainerTypes, initialState } from '../reducer';

describe('SearchTrackContainer reducer tests', () => {
  it('should return the initial state by default', () => {
    expect(searchTrackContainerReducer(undefined, {})).toEqual(initialState);
  });

  // it('should return the updated state when an action of type DEFAULT is dispatched', () => {
  //   const expectedResult = { ...initialState, somePayLoad: 'Mohammed Ali Chherawalla' };
  //   expect(
  //     searchTrackContainerReducer(initialState, {
  //       type: searchTrackContainerTypes.DEFAULT_ACTION,
  //       somePayLoad: 'Mohammed Ali Chherawalla'
  //     })
  //   ).toEqual(expectedResult);
  // });
});
