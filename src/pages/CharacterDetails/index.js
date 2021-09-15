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
  UlList
} from "./styles"


const CharacterDetails = ({ character }) => {

  const imgRef = useRef(null);
  const [imgUrl, setImgUrl] = useState("");
  const [seriesList, setSeriesList] = useState([]);
  const [maxPerPage, setMaxPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [listInterval, setListInterval] = useState({});
  const [totalPages, setTotalPages] = useState(0);


  useEffect(() => {
    const { thumbnail } = character;
    const img_url = thumbnail.path + "." + thumbnail.extension;

    setImgUrl(img_url);

  }, [])

  function handleOnload() {
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

  return (
    <MainContainer>
      <img src="header.png" alt="" style={{ width: "100%" }} />

      <TitleContainer>
        <TitleText>{character.name}</TitleText>
      </TitleContainer>

      <ContentContainer>
        <ImgContainer className="DivImage" ref={imgRef} src={imgUrl} alt="" onLoad={() => handleOnload()} />

        <SeriesContainer>
          <ListTitle>You can whatch me on...</ListTitle>

          <UlList max_per_page={maxPerPage}>
            {seriesList &&
              seriesList.slice(listInterval.start, listInterval.end).map((item, index) => <SeriesTitle key={index}>{item.name}</SeriesTitle>)
            }
          </UlList>

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