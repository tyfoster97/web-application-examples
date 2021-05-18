import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { Button } from "../../src/components";
import userEvent from "@testing-library/user-event";

describe('<Button />', () => {
  it('should render', () => {
    render(<Button />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should should render given value', () => {
    render(<Button value="Hello There" />);
    expect(screen.getByRole('button')).toHaveProperty('value', 'Hello There');
  });

  it('should use a callback when user clicks', async () => {
    const cb = jest.fn();
    render(<Button onClick={cb} />);
    act(() => userEvent.click(screen.getByRole('button')));
    expect(cb).toHaveBeenCalled();
  });

  it('should render with style', () => {
    render(<Button />);
    expect(screen.getByRole('button')).toHaveStyle(`
      height: 50px;
      border-radius: 5px;
      font-size: 16px;
      outline: 0;
      padding: 0 50px;
      border: none;
      color: #fff;
      box-sizing: border-box;
      background-color: #3498db;
      cursor: pointer;
      text-decoration: none;
      text-align: center;
      font-family: 'Open Sans',sans-serif;
      font-weight: 700;
    `);
  })
});
