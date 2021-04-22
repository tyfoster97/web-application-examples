import React from 'react';
import styled from 'styled-components';

export const Image = (props) => {
  const img = (props.imageUrl && props.imageUrl.length > 0) ?
    <Img role='image' imageurl={props.imageUrl} ></Img>
    :
    <NoImage role='noimage'>Fetch a new image →</NoImage>
  return <Wrapper role='wrapper'>
    {img}
  </Wrapper>;
};

Image.defaultProps = {
  imageUrl: null
}

const Wrapper = styled.div`
  width: 680px;
  height: 680px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0 0 0 1px #777;
  border-radius: 6px;
`;

const Img = styled.div`
  background-image: url(${props => props.imageUrl});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  width: 640px;
  height: 640px;
`

const NoImage = styled.div`
  color: #555;
  font-weight: 700;
  font-size: 28px;
  font-family: Open Sans,sans-serif;
`;
