import React from 'react';
import styled from 'styled-components';
import { Button, Checkbox, SelectField } from '../index';

export const UserInputPanel = (props) => {
  // setup sub-components
  const breed = <Checkbox
    label='Get by breed'
    onChange={e => props.onBreedCheckboxChange && props.onBreedCheckboxChange(e)}
    checked={props.useBreedSelection}
    disabled={props.animated}
  />;
  const gif = <Checkbox
    label='Get animated .gif'
    onChange={e => props.onGifChange && props.onGifChange(e)}
    checked={props.animated}
    disabled={props.useBreedSelection}
  />;
  const breedWrapper = <BreedSelectionWrapper role='breedselectwrapper'>
    {breed}
    <SelectField
      options={props.breeds}
      onChange={e=> props.onBreedChange && props.onBreedChange(e)}
      selectedOption={props.selectedBreed}
      disabled={!props.useBreedSelection}
    />
  </BreedSelectionWrapper>;
  const buttonWrapper = <ButtonWrapper role='buttonwrapper'>
    <Button
      value='Get image'
      onClick={e => props.onFetchClick && props.onFetchClick(e)}
    />
  </ButtonWrapper>;
  return <NavigationWrapper
    role='inputpanel'
  >
    {breedWrapper}
    {gif}
    {buttonWrapper}
  </NavigationWrapper>;
};

UserInputPanel.defaultProps = {
  animated: false,
  useBreedSelection: false,
  breeds: [],
  selectedBreed: undefined,
  onBreedCheckboxChange: () => {},
  onBreedChange: () => {},
  onGifChange: () => {},
  onFetchClick: () => {}
}

const NavigationWrapper = styled.div`
  height: 50%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding-left: 40px;
`;

const BreedSelectionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0 20px 0;
`;

const ButtonWrapper = styled.div`
  padding: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
