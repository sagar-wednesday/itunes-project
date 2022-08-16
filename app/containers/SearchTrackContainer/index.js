/**
 *
 * SearchTrackContainer Container
 *
 */

import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import styled from 'styled-components';
import { Input, Card } from 'antd';
import { debounce, get, isEmpty } from 'lodash';

import { selectSearchTrackName, selectTracksData, selectTracksError } from './selectors';
import { searchTrackContainerCreators } from './reducer';
import searchTrackContainerSaga from './saga';
import If from '@app/components/If/index';
import For from '@app/components/For/index';
import TracksCard from '@app/components/TracksCard/index';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TrackCardContainer = styled.div`
  && {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
    margin: 0 auto;
  }
`;

const TrackCustomCard = styled(Card)`
  && {
    width: 100%;
    background: transparent;
    border: none;
  }

  span {
    background-color: red;
  }
`;

const { Search } = Input;

const CustomSearch = styled(Search)`
  &.ant-input {
    background-color: transparent;
  }
`;

export function SearchTrackContainer({
  dispatchTracksResult,
  dispatchClearTracksResult,
  tracksData,
  searchedTrackName
}) {
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    if (searchedTrackName && !tracksData?.tracks?.length) {
      dispatchTracksResult(searchedTrackName);
    }
    return () => {
      dispatchClearTracksResult();
    };
  }, []);

  const handleTrackSearch = (trackName) => {
    if (trackName) {
      dispatchTracksResult(trackName);
    } else {
      dispatchClearTracksResult();
    }
  };

  const debouncedHandleTrackSearch = useCallback(debounce(handleTrackSearch, 500), []);

  const tracks = get(tracksData, 'results');

  const handleGlobalClick = (ref) => {
    setCurrentTrack(ref);
    const trackPaused = currentTrack?.current?.paused;
    if (!trackPaused && ref?.current.src !== currentTrack?.current.src) {
      currentTrack?.current?.pause();
    }
  };

  useEffect(() => {
    handleGlobalClick;
  }, []);

  const renderTracksList = () => {
    return (
      <If condition={!isEmpty(tracks)} otherwise={null}>
        <TrackCustomCard>
          <For
            of={tracks}
            ParentComponent={TrackCardContainer}
            renderItem={(item, index) => <TracksCard key={index} handleGlobalClick={handleGlobalClick} {...item} />}
          />
        </TrackCustomCard>
      </If>
    );
  };

  return (
    <MainContainer>
      <CustomSearch
        placeholder="search track"
        defaultValue={searchedTrackName}
        onChange={(e) => debouncedHandleTrackSearch(e?.target?.value)}
        enterButton
        autoFocus
        data-testid="search-bar"
        style={{ width: 400 }}
      />
      {renderTracksList()}
    </MainContainer>
  );
}

SearchTrackContainer.propTypes = {
  dispatchTracksResult: PropTypes.func,
  dispatchClearTracksResult: PropTypes.func,
  tracksData: PropTypes.shape({
    totalMatchingTracks: PropTypes.number,
    tracks: PropTypes.arrray
  }),
  searchedTrackName: PropTypes.string,
  trackIsPlaying: PropTypes.bool,
  tracksError: PropTypes.string
};

SearchTrackContainer.defaultProps = {
  tracksData: {},
  trackError: null
};

const mapStateToProps = createStructuredSelector({
  tracksData: selectTracksData(),
  tracksError: selectTracksError(),
  searchedTrackName: selectSearchTrackName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetItunesTracks, requestClearItunesTracks } = searchTrackContainerCreators;
  return {
    dispatchTracksResult: (trackName) => dispatch(requestGetItunesTracks(trackName)),
    dispatchClearTracksResult: () => dispatch(requestClearItunesTracks())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  injectSaga({ key: 'searchTrackContainer', saga: searchTrackContainerSaga })
)(SearchTrackContainer);

export const SearchTrackContainerTest = compose(injectIntl)(SearchTrackContainer);
