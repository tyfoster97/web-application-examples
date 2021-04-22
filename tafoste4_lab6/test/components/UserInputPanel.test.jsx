import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserInputPanel } from '../../src/components';

describe('<UserInputPanel />', () => {
  it('should render', () => {
    render(<UserInputPanel />);
    expect(screen.getByRole('inputpanel')).toBeInTheDocument();
  });
});
