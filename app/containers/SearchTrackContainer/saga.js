import { call, put, takeLatest } from 'redux-saga/effects';
import { searchTrackContainerCreators, searchTrackContainerTypes } from './reducer';
import { getTracks } from '@app/services/repoApi';

const { REQUEST_GET_ITUNES_TRACKS } = searchTrackContainerTypes;
const { successGetItunesTracks, failureGetItunesTracks } = searchTrackContainerCreators;

export function* getItunesTracks(action) {
  const response = yield call(getTracks, action.trackName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetItunesTracks(data));
  } else {
    yield put(failureGetItunesTracks(data));
  }
}

// Individual exports for testing
export default function* searchTrackContainerSaga() {
  yield takeLatest(REQUEST_GET_ITUNES_TRACKS, getItunesTracks);
}
