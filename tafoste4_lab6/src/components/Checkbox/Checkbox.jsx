import React from 'react';
import styled from 'styled-components';

export const Checkbox = (props) => {
  return (<Label checked={!!props.checked} isDisabled={!!props.disabled}>
    <Input
      type="checkbox"
      label={props.label}
      checked={!!props.checked}
      disabled={!!props.disabled}
      onChange={(e) => props.onChange && props.onChange(e.target)}
      onFocus={(e) => props.onFocus && props.onFocus(e.target)}
      onBlur={(e) => props.onBlur && props.onBlur(e.target)}
      />
    {props.label}
  </Label>);
};

Checkbox.defaultProps = {
  label: "",
  checked: false,
  disabled: false,
  scale: "medium",
  onChange: ()=>{},
  onFocus: ()=>{},
  onBlur: ()=>{}
};

const Input = styled.input`
  opacity: 0;
`;

const Label = styled.label`
  position: relative;
  padding-left: 35px;
  height: 25px;
  font-size: 16px;
  line-height: 25px;
  font-family: Open Sans,sans-serif;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
  color: ${props => props.isDisabled ? '#999' : '#555'};

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 23px;
    height: 23px;
    border: ${props => props.isDisabled ? '1px solid #eee' : '1px solid #aaa'};
    background: #fff;
    border-radius: .2em;
    box-shadow: inset 0 1px 3px rgba(0,0,0,.1) 0 0 0 rgba(203,34,237,.2);
  }
  ${props => props.checked && `
    &:after {
      content: '✓';
      position: absolute;
      top: 1px;
      left: 3px;
      width: 25px;
      height: 25px;
      font-size: 25px;
      line-height: 25px;
      transition: all .2s;
    }
  `}
`;
