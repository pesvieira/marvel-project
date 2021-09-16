import React from 'react'
import { useHistory } from "react-router-dom";

import {
  MainContainer,
  Line,
  ImgContainer,
  CharacterName
} from "./styles"


const CharacterCard = ({ character }) => {
  const history = useHistory();

  const { id, name, thumbnail } = character;
  const imgUrl = thumbnail.path + "." + thumbnail.extension;

  const custom_name = localStorage.getItem(id);

  const characterName = custom_name ? custom_name : name;
  const customFlag = custom_name ? true : false;


  return (
    <MainContainer className={"card" + id} customFlag={customFlag} onClick={() => history.push("/character", character)}>
      <ImgContainer src={imgUrl} alt='' />
      <Line>
        <CharacterName customFlag={customFlag}>{characterName.toUpperCase()}</CharacterName>
      </Line>
    </MainContainer>
  )
}

export default CharacterCard;