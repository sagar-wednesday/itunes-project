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

  it('should render For component when tracksData is available', async () => {
    const data = {
      resultCount: 2,
      results: [
        { id: 1, name: 'Some data 1' },
        { id: 2, name: 'Some another data' }
      ]
    };
    await timeout(500);
    const { getByTestId } = renderProvider(<SearchTrackContainer tracksData={data} />);
    expect(getByTestId('for')).toBeInTheDocument();
  });

  it('should pause previous audio when new audio is played', async () => {
    const data = {
      resultCount: 2,
      results: [
        { id: 1, name: 'Some data 1', previewUrl: 'https://abc1.com' },
        { id: 2, name: 'Some another data', previewUrl: 'https://abc3.com' }
      ]
    };
    const audios = new Array(data.resultCount);

    const handleGlobalClickSpy = jest.fn();

    const { getAllByRole, getAllByTestId } = renderProvider(<SearchTrackContainer tracksData={data} />);

    const playButton = getAllByRole('button', { name: /play/i });
    audios[0] = getAllByTestId('trackAudio')[0];
    audios[1] = getAllByTestId('trackAudio')[1];

    expect(audios[0].paused).toBeTruthy();
    expect(audios[1].paused).toBeTruthy();

    fireEvent.click(playButton[0], { onclick: handleGlobalClickSpy(audios[0]) });

    await timeout(500);
    expect(audios[0].paused).toBeFalsy();

    fireEvent.click(playButton[1], { onclick: handleGlobalClickSpy(audios[1]) });

    await timeout(500);
    expect(audios[1].paused).toBeTruthy();
    await timeout(500);
    expect(audios[0].paused).toBeTruthy();
  });
});
