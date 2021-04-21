import React from 'react';
import styled from 'styled-components';

export const Button = (props) => {
  return <button
      value={props.value}
    >
  </button>;
};

Button.defaultProps = {
  value: "",
  onClick: ()=>{}
};
