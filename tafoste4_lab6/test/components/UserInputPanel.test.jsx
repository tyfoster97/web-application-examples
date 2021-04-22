import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { UserInputPanel } from '../../src/components';
import userEvent from '@testing-library/user-event';

describe('<UserInputPanel />', () => {
  it('should render', () => {
    render(<UserInputPanel />);
    expect(screen.getByRole('inputpanel')).toBeInTheDocument();
    expect(screen.getByRole('breedselectwrapper')).toBeInTheDocument();
    expect(screen.getByRole('buttonwrapper')).toBeInTheDocument();
    expect(screen.getByRole('select')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByLabelText('Get by breed')).toBeInTheDocument();
    expect(screen.getByLabelText('Get animated .gif')).toBeInTheDocument();
  });

  it('should disable breed selection', () => {
    render(<UserInputPanel animated={true} />);
    expect(screen.getByLabelText('Get by breed')).toBeDisabled();
    expect(screen.getByRole('select')).toBeDisabled();
    expect(screen.getByLabelText('Get animated .gif')).toBeEnabled();
  });

  it('should disable gif selection', () => {
    render(<UserInputPanel useBreedSelection={true} />);
    expect(screen.getByLabelText('Get animated .gif')).toBeDisabled();
    expect(screen.getByLabelText('Get by breed')).toBeEnabled();
  });

  it('should render breeds', () => {
    const breeds = [
      'labradoodle'
    ];
    render(<UserInputPanel breeds={breeds} />);
    expect(screen.getByRole('option')).toBeInTheDocument();
    expect(screen.getByRole('option')).toHaveProperty('value', 'labradoodle');
  });

  it('should call callback on button click', () => {
    const cb = jest.fn();
    render(<UserInputPanel onFetchClick={cb} />);
    act(() => userEvent.click(screen.getByRole('button')));
    expect(cb).toHaveBeenCalled();
  });

  it('should call callback on breed selection checkbox click', () => {
    const cb = jest.fn();
    render(<UserInputPanel onBreedCheckboxChange={cb} />);
    act(() => userEvent.click(screen.getByLabelText('Get by breed')));
    expect(cb).toHaveBeenCalled();
  });

  it('should call callback on animated gif checkbox click', () => {
    const cb = jest.fn();
    render(<UserInputPanel onGifChange={cb} />);
    act(() => userEvent.click(screen.getByLabelText('Get animated .gif')));
    expect(cb).toHaveBeenCalled();
  });

  it('should call callback on option change', () => {
    const cb = jest.fn();
    render(<UserInputPanel onBreedChange={cb} />);
    fireEvent.change(screen.getByRole('select'));
    expect(cb).toHaveBeenCalled();
  });

  it('should render with style', () => {
    render(<UserInputPanel />);
    expect(screen.getByRole('inputpanel')).toHaveStyle(`
      height: 50%;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      padding-left: 40px;
    `);
    expect(screen.getByRole('breedselectwrapper')).toHaveStyle(`
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 40px 0 20px 0;
    `);
    expect(screen.getByRole('buttonwrapper')).toHaveStyle(`
      padding: 40px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    `);
  })
});
