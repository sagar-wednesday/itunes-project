/**
 * Test searchTrackContainer sagas
 */

import { takeLatest, call, put } from 'redux-saga/effects';
import searchTrackContainerSaga, { getItunesTracks } from '../saga';
import { searchTrackContainerTypes } from '../reducer';
import { getTracks } from '@app/services/repoApi';
import { apiResponseGenerator } from '@app/utils/testUtils';

describe('SearchTrackContainer saga tests', () => {
  const generator = searchTrackContainerSaga();
  const trackName = '';
  let getITunesTracksGenerator = getItunesTracks({ trackName });

  it('should start task to watch for REQUEST_GET_ITUNES_TRACKS action', () => {
    expect(generator.next().value).toEqual(
      takeLatest(searchTrackContainerTypes.REQUEST_GET_ITUNES_TRACKS, getItunesTracks)
    );
  });

  it('should ensure that the action SUCCESS_GET_GITHUB_REPOS is dispatched when the api call succeeds', () => {
    getITunesTracksGenerator = getItunesTracks({ trackName });
    const res = getITunesTracksGenerator.next().value;
    expect(res).toEqual(call(getTracks, trackName));
    const tracksResponse = {
      items: [{ trackName: trackName }]
    };
    expect(getITunesTracksGenerator.next(apiResponseGenerator(true, tracksResponse)).value).toEqual(
      put({
        type: searchTrackContainerTypes.SUCCESS_GET_ITUNES_TRACKS,
        data: tracksResponse
      })
    );
  });

  // it('should ensure that the action ERROR_GET_GITHUB_REPOS is dispatched when the api call fails', () => {
  //   const res = getITunesTracksGenerator.next().value;
  //   expect(res).toEqual(call(getTracks, trackName));
  //   const errorResponse = {
  //     errorMessage: 'There is an error while fetching the tracks data'
  //   };
  //   expect(getITunesTracksGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
  //     put({
  //       type: searchTrackContainerTypes.ERROR_GET_ITUNES_TRACKS,
  //       error: errorResponse
  //     })
  //   );
  // });
});
