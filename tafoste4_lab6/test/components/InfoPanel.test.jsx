import React from 'react';
import { render, screen } from '@testing-library/react';
import { InfoPanel } from '../../src/components';

describe('<InfoPanel />', () => {
  it('should render', () => {
    render(<InfoPanel />);
    expect(screen.getByRole('infopanel')).toBeInTheDocument();
  });
});
