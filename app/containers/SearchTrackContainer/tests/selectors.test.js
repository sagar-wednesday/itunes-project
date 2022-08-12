import { selectSearchTrackName } from '../selectors';

describe('SearchTrackContainer selector tests', () => {
  let mockedState;
  let searchedTrackName;
  let tracksData;

  beforeEach(() => {
    searchedTrackName = 'sol';
    tracksData = { items: [{ searchedTrackName }] };

    mockedState = {
      searchTrackContainer: {
        searchedTrackName,
        tracksData
      }
    };
  });

  it('should select the trackName', () => {
    const trackSelector = selectSearchTrackName();
    expect(trackSelector(mockedState)).toEqual(searchedTrackName);
  });
});
