/**
 *
 * SearchTrackContainer Container
 *
 */

import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage as T, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { Input } from 'antd';
import { selectSearchTrackName, selectTracksData, selectTracksError } from './selectors';
import { debounce, get, isEmpty, isNull, isUndefined } from 'lodash';
import { searchTrackContainerCreators } from './reducer';
import searchTrackContainerSaga from './saga';
import If from '@app/components/If/index';
import For from '@app/components/For/index';
import TracksCard from '@app/components/TracksCard/index';
import styled from 'styled-components';
import { CustomCard } from '../HomeContainer/index';

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  && {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
    margin: 0 auto;
  }
`;

const TrackCustomCard = styled(CustomCard)`
  && {
    width: 100%;
  }
`;

const { Search } = Input;

export function SearchTrackContainer({
  dispatchTracksResult,
  dispatchClearTracksResult,
  tracksData,
  tracksError,
  searchedTrackName
}) {
  useEffect(() => {
    if (searchedTrackName && !tracksData?.items?.length) {
      dispatchTracksResult(searchedTrackName);
    }
    return () => {
      dispatchClearTracksResult();
    };
  }, []);

  const handleTrackSearch = (trackName) => {
    if (trackName && trackName !== undefined) {
      dispatchTracksResult(trackName);
    } else {
      dispatchClearTracksResult();
    }
  };

  const debouncedHandleTrackSearch = useCallback(debounce(handleTrackSearch, 500), []);

  const renderTracksList = () => {
    const items = get(tracksData, 'results');
    return (
      <If condition={!isEmpty(items)}>
        <TrackCustomCard>
          <For
            of={items}
            ParentComponent={Container}
            renderItem={(item, index) => <TracksCard key={index} {...item} />}
          />
        </TrackCustomCard>
      </If>
    );
  };

  return (
    <MainBox>
      <Search
        placeholder="search track"
        defaultValue={searchedTrackName}
        onChange={(e) => debouncedHandleTrackSearch(e?.target?.value)}
        enterButton
        data-testid="search-bar"
        style={{ width: 400 }}
      />
      <If condition={!isUndefined(searchedTrackName) && !isNull(searchedTrackName)}> {renderTracksList()} </If>
    </MainBox>
  );
}

SearchTrackContainer.propTypes = {
  dispatchTracksResult: PropTypes.func,
  dispatchClearTracksResult: PropTypes.func,
  tracksData: PropTypes.shape({
    totalMatchingTracks: PropTypes.number,
    items: PropTypes.arrray
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
  const { requestGetItunesTracks, clearGetItunesTracks } = searchTrackContainerCreators;
  return {
    dispatchTracksResult: (trackName) => dispatch(requestGetItunesTracks(trackName)),
    dispatchClearTracksResult: () => dispatch(clearGetItunesTracks())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  injectSaga({ key: 'searchTrackContainer', saga: searchTrackContainerSaga })
)(SearchTrackContainer);

export const SearchTrackContainerTest = compose(injectIntl)(SearchTrackContainer);
