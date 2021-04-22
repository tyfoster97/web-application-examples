import React from 'react';
import styled from 'styled-components';

export const Checkbox = (props) => {
  return <label checked={!!props.checked} isDisabled={!!props.disabled}>
    <input
      type="checkbox"
      label={props.label}
      checked={!!props.checked}
      disabled={!!props.disabled}
      onChange={(e) => props.onChange && props.onChange(e.target.value)}
      />
    {props.label}
  </label>;
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
