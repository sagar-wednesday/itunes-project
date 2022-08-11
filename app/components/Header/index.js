/**
 *
 * Header
 *
 */

import React from 'react';
// import { Layout } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { colors } from '@themes';
// import T from '@components/T';
import logo from '@images/icon-512x512.png';

// const StyledHeader = styled(Layout.Header)`
//   && {
//     &.ant-layout-header {
//       padding: 0 1rem;
//       height: 7rem;
//     }
//     display: flex;
//     justify-content: center;
//     background-color: ${colors.primary};
//   }
// `;

const StyledHeader = styled.header`
  padding: 5rem 6rem;
  display: flex;
  /* justify-content: space-between; */
  gap: 0.5rem;
  align-items: center;
`;

const Logo = styled.img`
  height: 3rem;
  width: auto;
  opacity: 0.9;
`;

// const Title = styled(T)`
//   && {
//     margin-bottom: 0;
//     ${fonts.dynamicFontSize(fonts.size.xRegular, 1, 0.5)};
//     display: flex;
//     align-self: center;
//   }
// `;

const Title = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  opacity: 0.9;
  color: ${colors.secondary};
  text-transform: uppercase;
  letter-spacing: 1.5px;
  /* word-spacing: 2px; */
`;

function Header(props) {
  return (
    <StyledHeader {...props} data-testid="header">
      <Logo alt="logo" src={logo} />
      {/* <Title type="heading" id="wednesday_solutions" /> */}
      <Title>Wednesday Solutions</Title>
    </StyledHeader>
  );
}

export default injectIntl(Header);
