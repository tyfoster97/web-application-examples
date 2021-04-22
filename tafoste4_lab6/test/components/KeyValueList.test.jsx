import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { KeyValueList } from "../../src/components";
import userEvent from "@testing-library/user-event";

describe('<KeyValueList />', () => {
  it('should render', () => {
    render(<KeyValueList />);
    expect(screen.getByRole('wrapper')).toBeInTheDocument();
    expect(screen.getByRole('pairwrapper')).toBeInTheDocument();
    expect(screen.getByRole('key')).toBeInTheDocument();
    expect(screen.getByRole('value')).toBeInTheDocument();
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
});
