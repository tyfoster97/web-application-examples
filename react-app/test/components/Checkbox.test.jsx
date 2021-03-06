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

  it('should be disabled', () => {
    render(<Checkbox disabled={true} />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('should use callback on change', () => {
    const cb = jest.fn();
    render(<Checkbox onChange={cb} />);
    act(() => userEvent.click(screen.getByRole('checkbox'))); // simulates change event
    expect(cb).toHaveBeenCalled();
  });

  it('should use callback on focus', () => {
    const cb = jest.fn();
    render(<Checkbox onFocus={cb} />);
    fireEvent.focus(screen.getByRole('checkbox'));
    expect(cb).toHaveBeenCalled();
  });

  it('should use callback on blur', () => {
    const cb = jest.fn();
    render(<Checkbox onBlur={cb} />);
    fireEvent.blur(screen.getByRole('checkbox'));
    expect(cb).toHaveBeenCalled();
  });

  describe('should render with style', () => {
    it('should render with enabled colors when enabled', () => {
      render(<Checkbox label='for testing'/>);
      expect(screen.getByRole('checkbox')).toHaveStyle(`
        opacity: 0;
      `);
      expect(screen.getByText('for testing')).toHaveStyle(`
        position: relative;
        padding-left: 35px;
        height: 25px;
        font-size: 16px;
        line-height: 25px;
        font-family: Open Sans,sans-serif;
        font-weight: 700;
        cursor: pointer;
        user-select: none;
        color: #555;
      `);
    });

    it('should render with disabled colors when disabled', () => {
      render(<Checkbox label='for testing' disabled={true}/>);
      expect(screen.getByRole('checkbox')).toHaveStyle(`
        opacity: 0;
      `);
      expect(screen.getByText('for testing')).toHaveStyle(`
        position: relative;
        padding-left: 35px;
        height: 25px;
        font-size: 16px;
        line-height: 25px;
        font-family: Open Sans,sans-serif;
        font-weight: 700;
        cursor: pointer;
        user-select: none;
        color: #999;
      `);
    });
  });
});
