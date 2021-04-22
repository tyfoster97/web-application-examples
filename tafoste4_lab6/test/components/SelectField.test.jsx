import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { SelectField } from "../../src/components";
import userEvent from "@testing-library/user-event";

describe('<SelectField />', () => {
  it('should render', () => {
    render(<SelectField />);
    expect(screen.getByRole('select')).toBeInTheDocument();
  });
});
