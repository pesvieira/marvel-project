import React, { useEffect, useState, useRef } from "react";

import {
  MainContainer,
  TitleContainer,
  TitleText,
  ListTitle,
  ContentContainer,
  ImgContainer,
  SeriesContainer,
  SeriesTitle,
  PagesContainer,
  PageBox,
  UlList,
  EditName,
  CustomCharacterNameInput,
  NoSeriesText
} from "./styles"


const CharacterDetails = ({ character }) => {

  const imgRef = useRef(null);
  const [imgUrl, setImgUrl] = useState("");
  const [seriesList, setSeriesList] = useState([]);
  const [maxPerPage, setMaxPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [listInterval, setListInterval] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [characterName, setCharacterName] = useState("");
  const [characterId, setCharacterId] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [customCharacterName, setCustomCharacterName] = useState("");
  const [customFlag, setCustomFlag] = useState(false);


  useEffect(() => {
    const { id, name, thumbnail } = character;
    const img_url = thumbnail.path + "." + thumbnail.extension;

    const custom_name = localStorage.getItem(id);

    setCustomFlag(custom_name ? true : false);
    setImgUrl(img_url);
    setCharacterName(custom_name ? custom_name : name);
    setCharacterId(id);

    window.scrollTo(0, 0)
  }, [])

  function handleOnloadImgContainer() {
    const { series } = character;
    let max_per_page = Math.floor((imgRef.current.clientHeight - 136) / 50);  //136 is the distace between top of the div and the beginning of the series list

    // For responsive mode
    if (window.innerWidth <= 1020) {
      max_per_page = 11;
    }

    const total_pages = Math.ceil(series.items.length / max_per_page);

    setTotalPages(total_pages);
    setSeriesList(series.items);
    setCurrentPage(1);
    setMaxPerPage(max_per_page - 1);
    setListInterval({
      start: 0,
      end: max_per_page - 1
    });
  }

  function handleChangePage(newPage) {
    const new_list_interval = {
      start: (newPage - 1) * maxPerPage,
      end: ((newPage - 1) * maxPerPage) + maxPerPage
    };

    setListInterval(new_list_interval);
    setCurrentPage(newPage);
  }

  function saveCustomChracterName() {
    localStorage.setItem(characterId, customCharacterName);

    setCharacterName(customCharacterName);
    setCustomFlag(true);
    setEditMode(false);
  }

  function resetCustomCharacterName() {
    const { name } = character;

    localStorage.removeItem(characterId);

    setCharacterName(name);
    setCustomFlag(false);
  }

  function editModeToggle() {
    setEditMode(!editMode);
    setCustomCharacterName(characterName);
  }

  return (
    <MainContainer>
      <img src="header.png" alt="" style={{ width: "100%" }} />

      <TitleContainer customFlag={customFlag}>
        {editMode
          ?
          <>
            <CustomCharacterNameInput value={customCharacterName} onChange={(e) => setCustomCharacterName(e.target.value)} />
            <div style={{ display: "flex" }}>
              <EditName style={{ paddingRight: "0px" }} onClick={() => saveCustomChracterName()}>Save</EditName>
              <EditName onClick={() => editModeToggle()}>Cancel</EditName>
            </div>
          </>
          :
          <>
            <TitleText>{characterName}</TitleText>
            <div style={{ display: "flex" }}>
              <EditName onClick={() => editModeToggle()}>Edit</EditName>
              {customFlag && <EditName style={{ paddingLeft: "0px" }} onClick={() => resetCustomCharacterName()}>Reset</EditName>}
            </div>
          </>
        }

      </TitleContainer>

      <ContentContainer>
        <ImgContainer className="DivImage" ref={imgRef} src={imgUrl} alt="" onLoad={() => handleOnloadImgContainer()} />

        <SeriesContainer>
          <ListTitle>You can whatch me on...</ListTitle>

          {seriesList.length > 0 &&
            <UlList max_per_page={maxPerPage}>
              {seriesList.slice(listInterval.start, listInterval.end).map((item, index) => <SeriesTitle key={index}>{item.name}</SeriesTitle>)}
            </UlList>
          }

          {seriesList.length === 0 &&
            <NoSeriesText>No series found!</NoSeriesText>
          }

          <PagesContainer>
            {totalPages > 0 &&
              Array.from(Array(totalPages)).map((item, index) => {
                return (
                  <PageBox key={"S" + index.toString()}
                    selected={index + 1 === currentPage}
                    onClick={(e) => handleChangePage(parseInt(e.target.textContent))}>
                    {index + 1}
                  </PageBox>
                )
              })
            }
          </PagesContainer>

        </SeriesContainer>
      </ContentContainer>
    </MainContainer >
  )
};

export default CharacterDetails;