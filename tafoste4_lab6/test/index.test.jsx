import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Index from '../pages/index';
import userEvent from '@testing-library/user-event';

describe('<Index />', () => {
  it('should render', () => {
    render(<Index />);
    expect(screen.getByRole('index')).toBeInTheDocument();
    expect(screen.getByRole('sidebar')).toBeInTheDocument();
    expect(screen.getByRole('infopanel')).toBeInTheDocument();
    expect(screen.getByRole('inputpanel')).toBeInTheDocument();
    expect(screen.getByRole('noimage')).toBeInTheDocument();
  });

  it('should render with style', () => {
    render(<Index />);
    expect(screen.getByRole('index')).toHaveStyle(`
      margin: auto;
      padding: 40px;
      box-shadow: 0 0 0 1px #eee;
      width: 1280px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
    `);
    expect(screen.getByRole('sidebar')).toHaveStyle(`
      max-width: 500px;
      height: 720px;
    `);
  });
});
