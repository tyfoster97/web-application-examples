import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Image } from "../../src/components";
import userEvent from "@testing-library/user-event";

describe('<Image />', () => {
  it('should render', ()  => {
    render(<Image />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
