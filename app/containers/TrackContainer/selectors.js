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

export const selectSearchTrackContainer = () =>
  createSelector(selectSearchTrackContainerDomain, (substate) => substate);

export const selectTracksData = () =>
  createSelector(selectSearchTrackContainerDomain, (substate) => get(substate, 'tracksData'));

export const selectSearchTrackName = () =>
  createSelector(selectSearchTrackContainerDomain, (substate) => get(substate, 'searchedTrackName'));

export const selectTracksError = () =>
  createSelector(selectSearchTrackContainerDomain, (substate) => get(substate, 'tracksError'));

export const selectTrackId = () =>
  createSelector(selectSearchTrackContainerDomain, (substate) => get(substate, 'trackId'));

export const selectTrackDetails = () =>
  createSelector(selectSearchTrackContainerDomain, (substate) => get(substate, 'trackDetails'));

export const selectTrackDetailsError = () =>
  createSelector(selectSearchTrackContainerDomain, (substate) => get(substate, 'trackDetailsError'));

export default selectSearchTrackContainer;
