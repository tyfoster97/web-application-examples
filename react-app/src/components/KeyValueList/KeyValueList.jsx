import React, { useMemo } from 'react';
import styled from 'styled-components';

export const KeyValueList = (props) => {
  const items = useMemo(() => {
    return props.items.map((item, index) => {
      const keys = Object.keys(item);
      if (keys.length > 0) {
        return <PairWrapper role='pairwrapper' key={`key-value-list-item-${index}`}>
          <Key role='key'>{keys[0]}</Key>
          <Value role='value'>{item[keys[0]]}</Value>
        </PairWrapper>;
      }
    });
  }, [props.items]);

  return (<Wrapper role='wrapper'>{items}</Wrapper>);
};

KeyValueList.defaultProps = {
  items: []
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
