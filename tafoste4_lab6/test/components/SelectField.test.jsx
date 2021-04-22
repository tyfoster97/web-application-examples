import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { SelectField } from "../../src/components";

describe('<SelectField />', () => {
  it('should render', () => {
    render(<SelectField />);
    expect(screen.getByRole('select')).toBeInTheDocument();
  });

  it('should render with a label', () => {
    render(<SelectField label='This is a label' />);
    expect(screen.getByLabelText('This is a label')).toBeInTheDocument();
  });

  it('should be disabled', () => {
    render(<SelectField disabled={true} />);
    expect(screen.getByRole('select')).toBeDisabled();
  });

  it('should have a placeholder', () => {
    render(<SelectField placeholder='This is a placeholder' />);
    expect(screen.getByPlaceholderText('This is a placeholder')).toBeInTheDocument();
  });

  it('should render options', () => {
    const opts = [
      'foo'
    ];
    render(<SelectField options={opts} />);
    expect(screen.getByRole('option')).toBeInTheDocument();
  });

  it('should call callback on change', async () => {
    const cb = jest.fn();
    const opts = [
      'foo',
      'bar'
    ];
    render(<SelectField options={opts} onChange={cb}/>);
    fireEvent.change(screen.getByRole('select'));
    expect(cb).toHaveBeenCalled();
  });

  it('should render with style', () => {
    const opts = [
      'foo'
    ];
    render(<SelectField options={opts} />);
    expect(screen.getByRole('select')).toHaveStyle(`
      border-radius: 5px;
      height: 50px;
      font-size: 16px;
      min-width: 218px;
      outline: 0;
      border: none;
      box-shadow: inset 0 0 0 1px #ccc;
      font-family: Open Sans,sans-serif;
      font-weight: 700;
      color: #555;
      display: block;
      margin-top: 3px;
      padding: 0 5px;
    `);
    expect(screen.getByRole('option')).toHaveStyle(`
      font-family: Open Sans,sans-serif;
      font-size: 16px;
      font-weight: 700;
      color: #555;
    `);
    expect(screen.getByRole('label')).toHaveStyle(`
      font-family: Open Sans,sans-serif;
      font-size: 16px;
      text-indent: 5px;
      font-weight: 700;
      color: #555;
      display: block;
    `);
  })
});
