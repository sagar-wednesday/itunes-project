/**
 *
 * TracksCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Image, Button } from 'antd';
import { isEmpty } from 'lodash';
import If from '@components/If';

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    width: 15rem;
    height: 37rem;
  }
`;

const CustomText = styled.p`
  margin: 10px;
  font-size: 1rem;
`;

export function TracksCard({ collectionName, trackName, artworkUrl100: imgUrl /*previewUrl*/ }) {
  return (
    <CustomCard data-testid="tracks-card" cover={<Image alt="image" src={imgUrl} />}>
      <If condition={!isEmpty(trackName)}>
        <CustomText>Track Name: {trackName}</CustomText>
      </If>
      <If condition={!isEmpty(collectionName)}>
        <CustomText>Collection Name: {collectionName}</CustomText>
      </If>
      <Button type="primary">Play</Button>
      {/* <audio src={previewUrl}></audio> */}
    </CustomCard>
  );
}

TracksCard.propTypes = {
  collectionName: PropTypes.string,
  trackName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  previewUrl: PropTypes.string
};

export default TracksCard;
