/*
 *
 * SearchTrackContainer reducer
 *
 */
import produce from 'immer';
import { get } from 'lodash';
import { createActions } from 'reduxsauce';

export const initialState = {
  tracksData: {},
  searchedTrackName: null,
  tracksError: null,
  trackId: null,
  trackDetails: null,
  trackDetailsError: null
};

export const { Types: searchTrackContainerTypes, Creators: searchTrackContainerCreators } = createActions({
  requestGetItunesTracks: ['trackName'],
  successGetItunesTracks: ['data'],
  failureGetItunesTracks: ['error'],
  requestClearItunesTracks: {},
  requestGetTrackDetails: ['trackId'],
  successGetTrackDetails: ['data'],
  failureGetTrackDetails: ['error']
});

export const searchTrackContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case searchTrackContainerTypes.REQUEST_GET_ITUNES_TRACKS:
        draft.searchedTrackName = action.trackName;
        break;
      case searchTrackContainerTypes.SUCCESS_GET_ITUNES_TRACKS:
        draft.tracksData = action.data;
        break;
      case searchTrackContainerTypes.FAILURE_GET_ITUNES_TRACKS:
        draft.tracksError = get(action.error, 'message', 'something went wrong');
        break;
      case searchTrackContainerTypes.REQUEST_CLEAR_ITUNES_TRACKS:
        draft.tracksData = {};
        draft.searchedTrackName = null;
        draft.tracksError = null;
        break;
      case searchTrackContainerTypes.REQUEST_GET_TRACK_DETAILS:
        draft.trackDetails = null;
        draft.trackDetailsError = null;
        draft.trackId = action.trackId;
        break;
      case searchTrackContainerTypes.SUCCESS_GET_TRACK_DETAILS:
        draft.trackDetailsError = null;
        draft.trackDetails = action.data;
        break;
      case searchTrackContainerTypes.FAILURE_GET_TRACK_DETAILS:
        draft.trackDetailsError = action.error;
        break;
    }
  });

export default searchTrackContainerReducer;
