import React from 'react';
import styled from 'styled-components';

export const Button = (props) => {
  return <button
      value={props.value}
      onClick={(e) => props.onClick && props.onClick(e.target)}
    >
  </button>;
};

Button.defaultProps = {
  value: "",
  onClick: ()=>{}
};
