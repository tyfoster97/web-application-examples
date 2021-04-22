import React from 'react';
import { render, screen } from '@testing-library/react';
import { InfoPanel } from '../../src/components';

describe('<InfoPanel />', () => {
  it('should render', () => {
    render(<InfoPanel />);
    expect(screen.getByRole('infopanel')).toBeInTheDocument();
  });

  it('should render given stats', () => {
    const stats = [
      {foo: 'bar'}
    ];
    render(<InfoPanel stats={stats} />);
    // verify KeyValueList rendered
    expect(screen.getByRole('wrapper')).toBeInTheDocument();
    expect(screen.getByRole('pairwrapper')).toBeInTheDocument();
    expect(screen.getByRole('key')).toBeInTheDocument();
    expect(screen.getByRole('value')).toBeInTheDocument();
    expect(screen.getByText('foo')).toBeInTheDocument();
    expect(screen.getByText('bar')).toBeInTheDocument();
  });
});
