import { get } from 'lodash';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the searchTrackContainer state domain
 */

const selectSearchTrackContainerDomain = (state) => state.searchTrackContainer || initialState;

/**
 * other specific selectors
 */

export const selectTracksData = () =>
  createSelector(selectSearchTrackContainerDomain, (substate) => get(substate, 'tracksData'));

export const selectSearchTrackName = () =>
  createSelector(selectSearchTrackContainerDomain, (substate) => get(substate, 'searchedTrackName'));

export const selectTracksError = () =>
  createSelector(selectSearchTrackContainerDomain, (substate) => get(substate, 'tracksError'));
