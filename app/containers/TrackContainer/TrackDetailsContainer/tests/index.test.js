/**
 *
 * Tests for TrackDetailsContainer container
 *
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom';
import { renderProvider } from '@utils/testUtils';
import { TrackDetailsContainerTest as TrackDetailsContainer } from '../index';

describe('<TrackDetailsContainer /> container tests', () => {
  let trackDetails;
  let dispatchGetTrackDetailsSpy;

  beforeEach(() => {
    trackDetails = {
      artistName: 'Sia',
      collectionName: 'abc',
      cardImg: 'https://abc.jpg',
      previewUrl: 'https://bcw.mp3'
    };
    dispatchGetTrackDetailsSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(
      <TrackDetailsContainer dispatchGetTrackDetails={dispatchGetTrackDetailsSpy} trackDetails={trackDetails} />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
