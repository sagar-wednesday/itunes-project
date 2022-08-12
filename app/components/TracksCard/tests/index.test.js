import React from 'react';
import { renderProvider } from '@app/utils/testUtils';
import TracksCard from '../index';

describe('<TracksCard />', () => {
  it('should contain 1 TracksCard component', () => {
    const { getAllByTestId } = renderProvider(<TracksCard />);
    expect(getAllByTestId('tracks-card').length).toBe(1);
  });
});
