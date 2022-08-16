import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderProvider, timeout } from '@app/utils/testUtils';
import TracksCard from '../index';

describe('<TracksCard />', () => {
  let previewUrl;

  let handleGlobalClickSpy;

  beforeEach(() => {
    previewUrl =
      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/d4/06/39/d4063988-a5c8-974e-059b-5233110a322c/mzaf_2253161526891008132.plus.aac.p.m4a';

    handleGlobalClickSpy = jest.fn();
  });

  it('should contain 1 TracksCard component', () => {
    const { getAllByTestId } = renderProvider(<TracksCard />);
    expect(getAllByTestId('tracks-card').length).toBe(1);
  });

  it('should display play button', () => {
    const { getByRole } = renderProvider(<TracksCard handleGlobalClick={handleGlobalClickSpy} />);
    const playBtn = getByRole('button', { name: /play/i });
    expect(playBtn).toHaveTextContent(/play/i);
  });

  it('should display pause button on clicking the play button', async () => {
    const handlePlayPauseSpy = jest.fn();

    const { getByRole } = renderProvider(
      <TracksCard previewUrl={previewUrl} handleGlobalClick={handleGlobalClickSpy} />
    );
    const playBtn = getByRole('button', { name: /play/i });
    expect(playBtn).toHaveTextContent(/play/i);
    fireEvent.click(playBtn, { onclick: handlePlayPauseSpy() });
    await timeout(500);
    expect(playBtn).toHaveTextContent(/pause/i);
  });

  it('should call handlePlayPause on clicking the play/pause button', async () => {
    let audio;

    const handlePlayPauseSpy = jest.fn();

    const { getByRole, getByTestId } = renderProvider(<TracksCard handleGlobalClick={handleGlobalClickSpy} />);
    const playBtn = getByRole('button', { name: /play/i });

    audio = getByTestId('trackAudio');

    fireEvent.click(playBtn, { onclick: handlePlayPauseSpy() });
    await timeout(500);

    expect(handleGlobalClickSpy).toHaveBeenCalledWith({ current: audio });

    fireEvent.click(playBtn, { onclick: handlePlayPauseSpy() });
    await timeout(500);

    expect(handlePlayPauseSpy).toHaveBeenCalled();

    expect(handleGlobalClickSpy).toHaveBeenCalledWith({ current: audio });
  });
});
