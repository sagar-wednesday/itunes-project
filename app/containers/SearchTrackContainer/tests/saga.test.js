/**
 * Test searchTrackContainer sagas
 */

import { takeLatest, call, put } from 'redux-saga/effects';
import searchTrackContainerSaga, { getItunesTracks, getItunesTrackDetails } from '../saga';
import { searchTrackContainerTypes } from '../reducer';
import { getTracks, getTrackDetails } from '@app/services/repoApi';
import { apiResponseGenerator } from '@app/utils/testUtils';

describe('SearchTrackContainer saga tests', () => {
  const generator = searchTrackContainerSaga();
  let trackName = '';
  let trackId = '18556408';
  let getITunesTracksGenerator = getItunesTracks({ trackName });
  let getTrackDetailsGenerator = getItunesTrackDetails({ trackId });

  it('should start task to watch for REQUEST_GET_ITUNES_TRACKS action', () => {
    expect(generator.next().value).toEqual(
      takeLatest(searchTrackContainerTypes.REQUEST_GET_ITUNES_TRACKS, getItunesTracks)
    );
  });

  it('should ensure that the action SUCCESS_GET_ITUNES_TRACKS is dispatched when the api call succeeds', () => {
    trackName = 'sol';
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

  it('should ensure that the action FAILURE_GET_ITUNES_TRACKS is dispatched when the api call fails', () => {
    trackName = 'sol';
    getITunesTracksGenerator = getItunesTracks({ trackName });
    const res = getITunesTracksGenerator.next().value;
    expect(res).toEqual(call(getTracks, trackName));
    const errorResponse = {
      errorMessage: 'There is an error while fetching the tracks data'
    };
    expect(getITunesTracksGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: searchTrackContainerTypes.FAILURE_GET_ITUNES_TRACKS,
        error: errorResponse
      })
    );
  });

  it('should start task to watch for REQUEST_GET_TRACK_DETAILS', () => {
    expect(generator.next().value).toEqual(
      takeLatest(searchTrackContainerTypes.REQUEST_GET_TRACK_DETAILS, getItunesTrackDetails)
    );
  });

  it('should ensure that the action SUCCESS_GET_TRACK_DETAILS is dispatched when the api call succeeds', () => {
    getTrackDetailsGenerator = getItunesTrackDetails({ trackId });
    getTrackDetailsGenerator.next().value;
    const resTwo = getTrackDetailsGenerator.next().value;

    expect(resTwo).toEqual(call(getTrackDetails, trackId));

    const data = { results: [{ trackId }] };

    expect(getTrackDetailsGenerator.next(apiResponseGenerator(true, data)).value).toEqual(
      put({
        type: searchTrackContainerTypes.SUCCESS_GET_TRACK_DETAILS,
        data: data.results[0]
      })
    );
  });

  it('should ensure that the action FAILURE_GET_TRACK_DETAILS is dispatched when the api call fails', () => {
    getTrackDetailsGenerator = getItunesTrackDetails({ trackId });
    getTrackDetailsGenerator.next().value;
    const resTwo = getTrackDetailsGenerator.next().value;

    expect(resTwo).toEqual(call(getTrackDetails, trackId));
    const errorResponse = {
      originalError: {
        message: 'There is an error while fetching the tracks details'
      }
    };

    expect(getTrackDetailsGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: searchTrackContainerTypes.FAILURE_GET_TRACK_DETAILS,
        error: errorResponse.originalError.message
      })
    );
  });
});
