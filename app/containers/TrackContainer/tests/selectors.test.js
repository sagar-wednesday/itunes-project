import selectSearchTrackContainer, {
  selectSearchTrackName,
  selectTrackDetails,
  selectTrackDetailsError,
  selectTrackId,
  selectTracksData,
  selectTracksError
} from '../selectors';

describe('SearchTrackContainer selector tests', () => {
  let mockedState;
  let searchedTrackName;
  let tracksData;
  let trackDetails;
  let trackId;
  let tracksError;
  let trackDetailsError;

  beforeEach(() => {
    searchedTrackName = 'sol';
    trackId = '212212';
    tracksData = { items: [{ searchedTrackName }] };
    trackDetails = [{ trackId }];
    tracksError = 'something went wrong';
    trackDetailsError = 'error while fetching the track details';

    mockedState = {
      searchTrackContainer: {
        searchedTrackName,
        tracksData,
        trackDetails,
        tracksError,
        trackDetailsError,
        trackId
      }
    };
  });

  it('should select the trackName', () => {
    const trackSelector = selectSearchTrackName();
    expect(trackSelector(mockedState)).toEqual(searchedTrackName);
  });

  it('should select the searchTrackContainer state', () => {
    const searchTrackContainerSelector = selectSearchTrackContainer();
    expect(searchTrackContainerSelector(mockedState)).toEqual(mockedState.searchTrackContainer);
  });

  it('should select tracksData', () => {
    const searchTrackDataSelector = selectTracksData();
    expect(searchTrackDataSelector(mockedState)).toEqual(tracksData);
  });

  it('should select the trackDetails', () => {
    const trackDetailsSelector = selectTrackDetails();
    expect(trackDetailsSelector(mockedState)).toEqual(trackDetails);
  });

  it('should select the trackError', () => {
    const trackErrorSelector = selectTracksError();
    expect(trackErrorSelector(mockedState)).toEqual(tracksError);
  });

  it('should select the trackDetailsError', () => {
    const trackErrorSelector = selectTrackDetailsError();
    expect(trackErrorSelector(mockedState)).toEqual(trackDetailsError);
  });

  it('should select the trackError', () => {
    const trackErrorSelector = selectTrackId();
    expect(trackErrorSelector(mockedState)).toEqual(trackId);
  });
});
