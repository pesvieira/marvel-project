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
  const img_url = thumbnail.path + "." + thumbnail.extension;

  return (
    <MainContainer className={"card" + id}
      onClick={() => history.push("/character", character)}
    >
      <ImgContainer src={img_url} alt='' />
      <Line>
        <CharacterName>{name.toUpperCase()}</CharacterName>
      </Line>
    </MainContainer>
  )
}


export default CharacterCard;