import React from 'react';
import styled from 'styled-components';

export const Checkbox = (props) => {
  return <label>
    <input
      type="checkbox"
      label={props.label}
      checked={!!props.checked}
      disabled={!!props.disabled}
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
