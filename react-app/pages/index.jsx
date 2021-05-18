import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DOG_API_TYPE, useApi } from '../api/useApi';
import { Image, InfoPanel, UserInputPanel } from '../src/components';
import { DOG_API_KEY } from '../data/keys';

const Index = () => {
  const { fetchImage, apiUrl, breeds } = useApi(DOG_API_TYPE, DOG_API_KEY);

  const [selectedBreed, setSelectedBreed] = useState({});
  const [useBreedSelection, setUseBreedSelection] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [image, setImage] = useState();
  const [stats, setStats] = useState();

  const onFetchClick = async () => {
    const breed = useBreedSelection && selectedBreed.id;
    const { imageUrl, breedStats } = await fetchImage(
      breed,
      animated,
      DOG_API_KEY,
      apiUrl
    );
    setImage(imageUrl);
    setStats(breedStats);
  };

  const onBreedCheckboxChange = () => {
    if (!animated) {
      setUseBreedSelection(!useBreedSelection);
      setSelectedBreed(breeds[0]);
    }
  };

  const onBreedChange = (value) => setSelectedBreed(value);
  const onGifChange = () => !useBreedSelection && setAnimated(!animated);
  return (<Wrapper role='index'>
    <Image imageUrl={image} />
    <SideBarWrapper role='sidebar'>
      <InfoPanel stats={stats} />
      <UserInputPanel
        animated={animated}
        useBreedSelection={useBreedSelection}
        breeds={breeds}
        selectedBreed={selectedBreed}
        onBreedChange={onBreedChange}
        onBreedCheckboxChange={onBreedCheckboxChange}
        onGifChange={onGifChange}
        onFetchClick={onFetchClick}
      />
    </SideBarWrapper>
  </Wrapper>);
}

const Wrapper = styled.div`
  margin: auto;
  padding: 40px;
  box-shadow: 0 0 0 1px #eee;
  width: 1280px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
`;

const SideBarWrapper = styled.div`
  max-width: 500px;
  height: 720px;
`;

export default Index;
