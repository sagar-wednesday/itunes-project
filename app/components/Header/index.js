/**
 *
 * Header
 *
 */

import React from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { colors } from '@themes';
import logo from '@images/icon-512x512.png';

const StyledHeader = styled.header`
  padding: 3rem 6rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;

const Logo = styled.img`
  height: 4rem;
  width: auto;
  opacity: 0.9;
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  opacity: 0.9;
  color: ${colors.secondary};
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

function Header(props) {
  return (
    <StyledHeader {...props} data-testid="header">
      <Logo alt="logo" src={logo} />
      <Title>Wednesday Solutions</Title>
    </StyledHeader>
  );
}

export default injectIntl(Header);
