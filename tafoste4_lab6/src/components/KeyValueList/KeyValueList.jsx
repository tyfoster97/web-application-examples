import React from 'react';
import styled from 'styled-components';

export const KeyValueList = () => {
  return <Wrapper role='wrapper'>
    <PairWrapper role='pairwrapper'>
      <Key role='key'></Key><Value role='value'></Value>
    </PairWrapper>
  </Wrapper>
};

KeyValueList.defaultProps = {

}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: start;
  justify-items: start;
  font-family: Open Sans,sans-serif;
  font-size: 16px;
  height: auto;
`;

const PairWrapper = styled.div`
  padding: 3px 18px 3px 0;
  flex: 1 1 30%;
`;

const Key = styled.div`
  display: inline;
  color: #555;
  font-weight: 700;
  margin-right: 3px;
`;

const Value = styled.div`
  display: inline;
  color: #555;
`;
