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
  tracksError: null
};

export const { Types: searchTrackContainerTypes, Creators: searchTrackContainerCreators } = createActions({
  requestGetItunesTracks: ['trackName'],
  successGetItunesTracks: ['data'],
  errorGetItunesTracks: ['error'],
  clearGetItunesTracks: {}
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
      case searchTrackContainerTypes.ERROR_GET_ITUNES_TRACKS:
        draft.tracksError = get(action.error, 'message', 'something went wrong');
        break;
      case searchTrackContainerTypes.CLEAR_GET_ITUNES_TRACKS:
        draft.tracksData = {};
        draft.searchedTrackName = null;
        draft.tracksError = null;
        break;
    }
  });

export default searchTrackContainerReducer;
