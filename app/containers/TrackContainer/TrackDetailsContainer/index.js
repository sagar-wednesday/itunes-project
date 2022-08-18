/**
 *
 * TrackDetailsContainer Container
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { injectSaga } from 'redux-injectors';
import styled from 'styled-components';
import { selectTrackDetails, selectTrackDetailsError, selectSearchTrackContainer } from '../selectors';
import searchTrackContainerSaga from '../saga';
import { searchTrackContainerCreators } from '../reducer';
import TracksCard from '@app/components/TracksCard/index';
import { colors } from '@themes';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const CustomDetailsContainer = styled.div`
  background-color: ${colors.secondary};
  border-radius: 0.5rem;
  width: 32rem;
  display: flex;
  gap: 2rem;
`;

const CustomTrackExtraDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const CustomTrackExtraDetails = styled.p`
  font-size: 0.75rem;
  color: ${colors.text};
  opacity: 0.9;
`;

const BoldText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`;

export function TrackDetailsContainer({ dispatchGetTrackDetails, trackDetails, trackDetailsError }) {
  const { trackId } = useParams();

  useEffect(() => {
    dispatchGetTrackDetails(trackId);
  }, []);

  return (
    <Container>
      <CustomDetailsContainer>
        <TracksCard
          width="15rem"
          collectionName={trackDetails?.collectionName}
          trackName={trackDetails?.trackName}
          imgUrl={trackDetails?.artworkUrl100}
          previewUrl={trackDetails?.previewUrl}
          tags={trackDetails?.kind}
        />
        <CustomTrackExtraDetailsContainer>
          <CustomTrackExtraDetails>
            <BoldText>Country: </BoldText>
            {trackDetails?.country}
          </CustomTrackExtraDetails>
          <CustomTrackExtraDetails>
            <BoldText>Artist Name: </BoldText>
            {trackDetails?.artistName}
          </CustomTrackExtraDetails>
          <CustomTrackExtraDetails>
            <BoldText>Genre: </BoldText>
            {trackDetails?.primaryGenreName}
          </CustomTrackExtraDetails>
        </CustomTrackExtraDetailsContainer>
      </CustomDetailsContainer>
    </Container>
  );
}

TrackDetailsContainer.propTypes = {
  dispatchGetTrackDetails: PropTypes.func,
  trackDetails: PropTypes.shape({
    trackName: PropTypes.string,
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
    previewUrl: PropTypes.string,
    artworkUrl100: PropTypes.string,
    kind: PropTypes.string,
    primaryGenreName: PropTypes.string,
    country: PropTypes.string
  }),
  trackDetailsError: PropTypes.string
};

TrackDetailsContainer.defaultProps = {
  trackDetails: {
    country: '',
    primaryGenreName: '',
    artistName: ''
  }
};

const mapStateToProps = createStructuredSelector({
  trackContainer: selectSearchTrackContainer(),
  trackDetails: selectTrackDetails(),
  trackDetailsError: selectTrackDetailsError()
});

function mapDispatchToProps(dispatch) {
  const { requestGetTrackDetails } = searchTrackContainerCreators;
  return {
    dispatchGetTrackDetails: (trackId) => dispatch(requestGetTrackDetails(trackId))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  injectSaga({ key: 'trackContainer', saga: searchTrackContainerSaga })
)(TrackDetailsContainer);

export const TrackDetailsContainerTest = compose(injectIntl)(TrackDetailsContainer);
