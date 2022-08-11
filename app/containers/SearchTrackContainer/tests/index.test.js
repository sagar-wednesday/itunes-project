/**
 *
 * Tests for SearchTrackContainer container
 *
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderProvider, timeout } from '@utils/testUtils';
import { SearchTrackContainerTest as SearchTrackContainer } from '../index';

describe('<SearchTrackContainer /> container tests', () => {
  // let submitSpy;

  // beforeEach(() => {
  //   submitSpy = jest.fn();
  // });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<SearchTrackContainer />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should dispatchTrackResult on entering the search query', async () => {
    const getTracksResultSpy = jest.fn();
    const clearTracksResultSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <SearchTrackContainer
        dispatchTracksResult={getTracksResultSpy}
        dispatchClearTracksResult={clearTracksResultSpy}
      />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getTracksResultSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearTracksResultSpy).toBeCalled();
  });
});
