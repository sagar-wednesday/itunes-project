import { searchTrackContainerReducer, initialState, searchTrackContainerTypes } from '../reducer';

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

  it('should return the initial state when an action of type Requesting to fetch the tracks data', () => {
    const data = { trackName: 'sol' };
    const expectedResult = { ...initialState, tracksData: {}, searchedTrackName: undefined };
    expect(
      searchTrackContainerReducer(initialState, {
        type: searchTrackContainerTypes.REQUEST_GET_ITUNES_TRACKS,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the tracks data is present when fetching the tracks data is successful', () => {
    const data = { trackName: 'sol' };
    const expectedResult = { ...initialState, tracksData: data };
    expect(
      searchTrackContainerReducer(initialState, {
        type: searchTrackContainerTypes.SUCCESS_GET_ITUNES_TRACKS,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the error message is returned when fetching the tracks data is failed', () => {
    const error = 'something went wrong';
    const expectedResult = { ...initialState, tracksError: error };
    expect(
      searchTrackContainerReducer(initialState, {
        type: searchTrackContainerTypes.ERROR_GET_ITUNES_TRACKS,
        error
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the error message is returned when fetching the tracks data is failed', () => {
    const expectedResult = { ...initialState, tracksData: {}, searchedTrackName: null, tracksError: null };
    expect(
      searchTrackContainerReducer(initialState, {
        type: searchTrackContainerTypes.CLEAR_GET_ITUNES_TRACKS
      })
    ).toEqual(expectedResult);
  });
});
