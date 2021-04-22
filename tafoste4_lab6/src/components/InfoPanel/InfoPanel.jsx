import React from 'react';
import styled from 'styled-components';
import { KeyValueList } from '../index';

export const InfoPanel = (props) => {
  const child = (props.stats) ? <KeyValueList items={props.stats} /> : <NoInfoWrapper role='wrapper' children={<NoInfo role='noinfo'>No Info</NoInfo>}/>;
  return <StatsWrapper
    role='infopanel'
    stats={props.stats}
    children={child}
  />;
}

InfoPanel.defaultProps = {
  stats: null
};

const StatsWrapper = styled.div`
  padding-left: 40px;
  height: 50%;
  justify-content: flex-end;
  display: flex;
`;

const NoInfoWrapper = styled.div`
  height: 52%;
  width: 98%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoInfo = styled.div`
  color: #555;
  font-weight: 700;
  font-family: Open Sans,sans-serif;
`;
