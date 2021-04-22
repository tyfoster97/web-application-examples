import React, { useMemo } from 'react';
import styled from 'styled-components';

export const SelectField = (props) => {
  const options = useMemo(() => {
    return props.options.map((option, index) => {
      return <Option role='option' key={`${props.label}select-field${index}`} value={option}>{option}</Option>;
    });
  }, [props.options, props.selectedOption]);

  const handleOnChange = e => {
    const value = { value: e.target.value, label: e.target.value};
    props.onChange(value);
  }
  return <Label role='label'>
    {props.label}
    <Select
      role='select'
      disabled={!!props.disabled}
      placeholder={props.placeholder}
      onChange={(e) => props.onChange && handleOnChange(e)}
    >
      {options}
    </Select>
  </Label>;
};

SelectField.defaultProps = {
  label: '',
  options: [],
  selectedOption: {},
  disabled: false,
  placeholder: 'Select an option',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {}
}

const Select = styled.select`
  border-radius: 5px;
  height: 50px;
  font-size: 16px;
  min-width: 218px;
  outline: 0;
  border: none;
  box-shadow: inset 0 0 0 1px #ccc;
  font-family: Open Sans, sans-serif;
  font-weight: 700;
  color: #555;
  display: block;
  margin-top: 3px;
  &:focus {
    outline: 0;
    box-shadow: 0 0 5px 3px #cce0ff;
    background-color: #e8f1ff;
  }
  padding: 0 5px;
`;

const Option = styled.option`
  font-family: Open Sans, sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #555;
`;

const Label = styled.label`
  font-family: Open Sans, sans-serif;
  font-size: 16px;
  text-indent: 5px;
  font-weight: 700;
  color: #555;
  display: block;
`;
