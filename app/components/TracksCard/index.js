/**
 *
 * TracksCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Image, Button } from 'antd';
// import { PlayCircleOutlined } from '@ant-design/icons';
import If from '@components/If';
import { isEmpty } from 'lodash';

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    width: 240px;
    height: 600px;
  }
`;

const CustomText = styled.p`
  margin: 10px;
  font-size: 1rem;
`;

export function RepoCard({ collectionName, trackName, artworkUrl100: url }) {
  return (
    <CustomCard data-testid="tracks-card" cover={<Image alt="image" src={url} />}>
      <If condition={!isEmpty(trackName)}>
        <CustomText>Track Name: {trackName}</CustomText>
      </If>
      <If condition={!isEmpty(collectionName)}>
        <CustomText>Collection Name: {collectionName}</CustomText>
      </If>

      {/* <Tooltip title="play">
        <Button icon={<PlayCircleOutlined />} size="auto" />
      </Tooltip> */}
      <Button type="primary">Play</Button>
    </CustomCard>
  );
}

RepoCard.propTypes = {
  collectionName: PropTypes.string,
  trackName: PropTypes.string,
  artworkUrl100: PropTypes.string
};

export default RepoCard;
