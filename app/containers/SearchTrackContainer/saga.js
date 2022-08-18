import { call, put, takeLatest, select } from 'redux-saga/effects';
import { searchTrackContainerCreators, searchTrackContainerTypes } from './reducer';
import { getTrackDetails, getTracks } from '@app/services/repoApi';
import { selectTracksData } from './selectors';

const { REQUEST_GET_ITUNES_TRACKS, REQUEST_GET_TRACK_DETAILS } = searchTrackContainerTypes;
const { successGetItunesTracks, failureGetItunesTracks, successGetTrackDetails, failureGetTrackDetails } =
  searchTrackContainerCreators;

export function* getItunesTracks(action) {
  const response = yield call(getTracks, action.trackName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetItunesTracks(data));
  } else {
    yield put(failureGetItunesTracks(data));
  }
}

export function* getItunesTrackDetails(action) {
  let tracksData;

  tracksData = yield select(selectTracksData());

  const trackItem = tracksData?.results?.find((track) => track?.trackId.toString() === action.trackId);

  if (!trackItem) {
    const response = yield call(getTrackDetails, action.trackId);
    const { ok, data } = response;
    if (ok && data.results.length) {
      yield put(successGetTrackDetails(data.results[0]));
    } else {
      const error = data.originalError.message;
      yield put(failureGetTrackDetails(error));
    }
  } else {
    yield put(successGetTrackDetails(trackItem));
  }
}

// Individual exports for testing
export default function* searchTrackContainerSaga() {
  yield takeLatest(REQUEST_GET_ITUNES_TRACKS, getItunesTracks);
  yield takeLatest(REQUEST_GET_TRACK_DETAILS, getItunesTrackDetails);
}
