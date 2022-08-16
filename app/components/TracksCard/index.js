/**
 *
 * TracksCard
 *
 */

import React, { useRef, useState } from 'react';
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

export function TracksCard({
  collectionName,
  trackName,
  artworkUrl100: imgUrl,
  previewUrl,
  handleGlobalClick,
  trackId
}) {
  const audioRef = useRef(null);
  const [playTrack, setPlayTrack] = useState(false);

  const handlePlayPause = (e) => {
    e.preventDefault();

    const trackPaused = audioRef.current?.paused;
    if (trackPaused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    setPlayTrack(!playTrack);

    if (handleGlobalClick) {
      handleGlobalClick(audioRef);
    }
  };

  return (
    <CustomCard data-testid="tracks-card" cover={<Image alt="image" src={imgUrl} />}>
      <If condition={!isEmpty(trackName)}>
        <CustomText>Track Name: {trackName}</CustomText>
      </If>
      <If condition={!isEmpty(collectionName)}>
        <CustomText>Collection Name: {collectionName}</CustomText>
      </If>
      <Button type="primary" onClick={(e) => handlePlayPause(e)}>
        <If condition={!audioRef.current?.paused && audioRef.current?.src} otherwise={<CustomText>Play</CustomText>}>
          <CustomText>Pause</CustomText>
        </If>
      </Button>
      <audio ref={audioRef} src={previewUrl} data-testid="trackAudio"></audio>
    </CustomCard>
  );
}

TracksCard.propTypes = {
  collectionName: PropTypes.string,
  trackName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  previewUrl: PropTypes.string,
  handleGlobalClick: PropTypes.func,
  trackId: PropTypes.number
};

export default TracksCard;
