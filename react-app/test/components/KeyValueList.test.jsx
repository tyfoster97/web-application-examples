import React from 'react';
import { render, screen } from '@testing-library/react';
import { KeyValueList } from "../../src/components";

describe('<KeyValueList />', () => {
  it('should render', () => {
    render(<KeyValueList />);
    expect(screen.getByRole('wrapper')).toBeInTheDocument();
  });

  it('should render with style', () => {
    render(<KeyValueList />);
    expect(screen.getByRole('wrapper')).toHaveStyle(`
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-content: start;
      justify-items: start;
      font-family: Open Sans,sans-serif;
      font-size: 16px;
      height: auto;
    `);
  });

  it('should render an item', () => {
    const item = [
      {a: 'test'}
    ];
    render(<KeyValueList items={item} />);
    // check divs render
    expect(screen.getByRole('pairwrapper')).toBeInTheDocument();
    expect(screen.getByRole('key')).toBeInTheDocument();
    expect(screen.getByRole('value')).toBeInTheDocument();
    // pair 1
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should render an item with style', () => {
    const item = [
      {a: 'test'}
    ];
    render(<KeyValueList items={item} />);
    // check divs render
    expect(screen.getByRole('pairwrapper')).toHaveStyle(`
      padding: 3px 18px 3px 0;
      flex: 1 1 30%;
    `);
    expect(screen.getByRole('key')).toHaveStyle(`
      display: inline;
      color: #555;
      font-weight: 700;
      margin-right: 3px;
    `);
    expect(screen.getByRole('value')).toHaveStyle(`
      display: inline;
      color: #555;
    `);
  });

  it('should render multiple items', () => {
    const item = [
      {a: 'test'},
      {b: 'tested'}
    ];
    render(<KeyValueList items={item} />);
    // pair 1
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
    // pair 2
    expect(screen.getByText('b')).toBeInTheDocument();
    expect(screen.getByText('tested')).toBeInTheDocument();
  });
});
