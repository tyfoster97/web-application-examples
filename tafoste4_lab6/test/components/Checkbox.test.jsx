import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Checkbox } from "../../src/components";
import userEvent from "@testing-library/user-event";

describe('<Checkbox />', () => {
  it('should render', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should render a given label', () => {
    render(<Checkbox label="This is a label" />);
    expect(screen.getByText('This is a label')).toBeInTheDocument();
  });

  it('should be checked', () => {
    render(<Checkbox checked={true} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});
