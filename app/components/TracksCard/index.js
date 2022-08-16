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
import { colors } from '@themes';
// import { useHistory } from 'react-router-dom';

const CustomCard = styled(Card)`
  && {
    border-radius: 0.5rem;
    padding: 0.5rem;
    width: 15rem;
    height: 22rem;
    border: none;
    background-color: ${colors.secondary};
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    div.ant-card-cover {
      width: 100%;
      height: 50%;

      div.ant-image {
        height: 100%;

        div.ant-image-img {
          height: 100%;
          border-radius: 0.5rem;
        }

        div.ant-image-mask {
          border-radius: 0.5rem;
        }
      }

      img {
        height: 100%;
        border-radius: 0.5rem;
      }
    }

    div.ant-card-body {
      padding: 0.75rem 0.25rem 0.25rem;
      height: 50%;
      display: grid;
      grid-template-rows: 0.5fr 1fr 2fr 1fr;
      gap: 0.5rem;

      &::after,
      &::before {
        display: none;
        content: none;
      }
    }
  }
`;

const CardHeader = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  color: ${colors.text};
  letter-spacing: 0.1px;
  padding-left: 0.25rem;
  line-height: 1.2;
  display: block; /* Fallback for non-webkit */
  display: -webkit-box;
  -webkit-line-clamp: 1; /* no of lines */
  text-overflow: ellipsis;
  overflow: hidden !important;
  -webkit-box-orient: vertical;
`;

const CardDescription = styled.span`
  font-size: 0.75rem;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  opacity: 0.9;
  padding-left: 0.25rem;
  color: ${colors.text};
  display: block; /* Fallback for non-webkit */
  display: -webkit-box;
  -webkit-line-clamp: 3; /* no of lines */
  line-height: 1.4;
  text-overflow: ellipsis;
  overflow: hidden !important;
  -webkit-box-orient: vertical;
`;

const PlayBtn = styled(Button)`
  && {
    background-color: ${colors.primaryLight};
    border: none;
    color: ${colors.secondary};
    border-radius: 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    width: 100%;

    &:hover {
      background-color: ${colors.primaryDark};
    }
  }
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const MoreBtn = styled(Button)`
  && {
    background-color: ${colors.text};
    border: none;
    color: ${colors.secondary};
    border-radius: 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    width: 100%;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const ButtonText = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
`;

const CustomTags = styled.span`
  background-color: ${colors.text};
  opacity: 0.8;
  width: fit-content;
  padding: 0.2rem 0.5rem;
  height: 1.5rem;
  font-size: 0.75rem;
  border-radius: 2rem;
  font-weight: 500;
`;

// --------TracksCard Component--------------

export function TracksCard({
  collectionName,
  trackName,
  artworkUrl100: imgUrl,
  previewUrl,
  handleGlobalClick,
  kind: tags,
  trackId
}) {
  const audioRef = useRef(null);
  const [playTrack, setPlayTrack] = useState(false);
  // const history = useHistory();

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

  // const handleRedirectingToPage = (e, trackId) => {
  //   e.preventDefault();
  //   history.push(`/track/${trackId}`);
  // };

  return (
    <CustomCard data-testid="tracks-card" cover={<Image alt="image" src={imgUrl} />}>
      <If condition={!isEmpty(tags)} otherwise={<CustomTags>....</CustomTags>}>
        <CustomTags>{tags}</CustomTags>
      </If>
      <If condition={!isEmpty(trackName)} otherwise={<CardHeader>....No Title....</CardHeader>}>
        <CardHeader>{trackName}</CardHeader>
      </If>
      <If condition={!isEmpty(collectionName)} otherwise={<CardDescription>....Not Available....</CardDescription>}>
        <CardDescription>{collectionName}</CardDescription>
      </If>
      <BtnContainer>
        {/* <MoreBtn onClick={(e) => handleRedirectingToPage(e, trackId)}>More</MoreBtn> */}
        <MoreBtn>More</MoreBtn>
        <PlayBtn onClick={(e) => handlePlayPause(e)}>
          <If condition={!audioRef.current?.paused && audioRef.current?.src} otherwise={<ButtonText>Play</ButtonText>}>
            <ButtonText>Pause</ButtonText>
          </If>
        </PlayBtn>
      </BtnContainer>
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
  kind: PropTypes.string,
  trackId: PropTypes.number
};

export default TracksCard;
