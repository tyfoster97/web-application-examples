import React from 'react';
import { render, screen } from '@testing-library/react';
import { Image } from "../../src/components";

describe('<Image />', () => {
  it('should render', ()  => {
    render(<Image />);
    expect(screen.getByRole('wrapper')).toBeInTheDocument();
  });

  it('should render with an  image',  ()  => {
    render(<Image imageUrl='test'/>);
    expect(screen.getByRole('image')).toBeInTheDocument();
  });

  it('should render with text', () => {
    render(<Image />);
    expect(screen.getByRole('noimage')).toBeInTheDocument();
  });

  it('should render with style', () => {
    render(<Image imageUrl=''/>);
    expect(screen.getByRole('wrapper')).toHaveStyle(`
      width: 680px;
      height: 680px;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      box-shadow: 0 0 0 1px #777;
      border-radius: 6px;
    `);
    expect(screen.getByRole('noimage')).toHaveStyle(`
      color: #555;
      font-weight: 700;
      font-size: 28px;
      font-family: Open Sans,sans-serif;
    `);
  });

  it('should render an image with style', () => {
    render(<Image imageUrl='test'/>);
    expect(screen.getByRole('wrapper')).toHaveStyle(`
      width: 680px;
      height: 680px;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      box-shadow: 0 0 0 1px #777;
      border-radius: 6px;
    `);
    expect(screen.getByRole('image')).toHaveStyle(`
      background-image: url();
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;
      width: 640px;
      height: 640px;
    `);
  });
});
