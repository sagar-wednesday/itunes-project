/**
 *
 * TracksCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Image } from 'antd';
import T from '@components/T';
import If from '@components/If';
import { isEmpty } from 'lodash';

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    width: 240px;
    height: 600px
  }
`;

const CustomText = styled.p`
  margin: 10px;
  font-size: 1rem;
`;

export function RepoCard({ collectionName, trackName, artworkUrl100 : url }) {
  return (
    <CustomCard data-testid="repo-card" cover={<Image alt="image" src={url} />}>
      <If condition={!isEmpty(trackName)} otherwise={<T data-testid="name-unavailable" id="repo_name_unavailable" />}>
        <CustomText>Track Name: {trackName}</CustomText>
      </If>
      <If
        condition={!isEmpty(collectionName)}
        otherwise={<T data-testid="collection-name-unavailable" id="collection_name_unavailable" />}
      >
        <CustomText>Collection Name: {collectionName}</CustomText>
      </If>
    </CustomCard>
  );
}

RepoCard.propTypes = {
  collectionName: PropTypes.string,
  trackName: PropTypes.string,
  artworkUrl100: PropTypes.string
};

export default RepoCard;