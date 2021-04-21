import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Button } from "../../src/components";
import userEvent from "@testing-library/user-event";

describe('<Button />', () => {
  it('should render', () => {
    render(<Button />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
