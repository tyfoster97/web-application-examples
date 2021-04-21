import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
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
});
