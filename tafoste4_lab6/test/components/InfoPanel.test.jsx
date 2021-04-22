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

  it('should render no info', () => {
    render(<InfoPanel />);
    expect(screen.getByRole('wrapper')).toBeInTheDocument();
    expect(screen.getByRole('noinfo')).toBeInTheDocument();
    expect(screen.getByText('No Info')).toBeInTheDocument();
  });

  it('should render with style', () => {
    render(<InfoPanel />);
    expect(screen.getByRole('infopanel')).toHaveStyle(`
      padding-left: 40px;
      height: 50%;
      justify-content: flex-end;
      display: flex;
    `);
    expect(screen.getByRole('wrapper')).toHaveStyle(`
      height: 52%;
      width: 98%;
      display: flex;
      align-items: center;
      justify-content: center;
    `);
    expect(screen.getByRole('noinfo')).toHaveStyle(`
      color: #555;
      font-weight: 700;
      font-family: Open Sans,sans-serif;
    `);
  });
});
