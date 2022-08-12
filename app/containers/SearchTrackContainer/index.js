/**
 *
 * SearchTrackContainer Container
 *
 */

import React, { useCallback, useEffect } from 'react';
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
`;

const { Search } = Input;

export function SearchTrackContainer({
  dispatchTracksResult,
  dispatchClearTracksResult,
  tracksData,
  // tracksError,
  searchedTrackName
}) {
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

  const renderTracksList = () => {
    const tracks = get(tracksData, 'results');
    return (
      <If condition={!isEmpty(tracks)}>
        <TrackCustomCard>
          <For
            of={tracks}
            ParentComponent={TrackCardContainer}
            renderItem={(item, index) => <TracksCard key={item.trackId} {...item} />}
          />
        </TrackCustomCard>
      </If>
    );
  };

  return (
    <MainContainer>
      <Search
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
