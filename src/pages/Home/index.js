import React, { useState, useEffect } from "react";
import CharacterCard from "../../components/CharacterCard";
import api from "../../services/api";
import MD5 from "crypto-js/md5";
import InfiniteScroll from "../../components/InfiniteScroll";
import { IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import {
  MainContainer,
  RowContainer,
  CharactersContainer,
  InputSearch,
  Subtitle
} from "./styles"


const Home = () => {

  const [characters, setCharacters] = useState([]);
  const [currentPagesLoaded, setCurrentPagesLoaded] = useState(0);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [selectAll, setSelectAll] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    async function getData() {
      const params = {
        limit: process.env.REACT_APP_LIMIT_PER_PAGE,
        page: 0
      }

      const { total, results } = await loadMarvelCharacters(params);

      setCharacters(results);

      return total;
    }

    const total = getData();
    setTotalCharacters(total);

    setLoading(false);
  }, []);

  //Number zero is the index of first page 
  /*Params:
    limit, 
    page, 
    all, 
    search_string,
  */
  async function loadMarvelCharacters(params) {
    try {
      const date = new Date();
      const timestamp = date.getTime().toString();

      const ts = "&ts=" + timestamp;
      const hash = "&hash=" + MD5(timestamp + process.env.REACT_APP_PRIVATE_KEY + process.env.REACT_APP_PUBLIC_KEY).toString();

      const url_params = "?orderBy=name&limit=" + params.limit.toString() + "&offset=" + (params.page * params.limit).toString() + "&apikey=" + process.env.REACT_APP_PUBLIC_KEY;

      const url = params.search_string
        ?
        "v1/public/characters" + url_params + "&nameStartsWith=" + params.search_string + hash + ts
        :
        "v1/public/characters" + url_params + hash + ts;

      const response = await api.get(url);

      if (response.data.data.total === 0) {
        setErrorMessage("No results found!");
      } else {
        setErrorMessage("");
      }

      return response.data.data;

    } catch (err) {
      console.log(err);
    }
  }

  async function listMore() {

    if ((currentPagesLoaded + 1) * process.env.REACT_APP_LIMIT_PER_PAGE >= totalCharacters) {
      return null;
    }

    setLoading(true);

    const params = {
      limit: process.env.REACT_APP_LIMIT_PER_PAGE,
      page: currentPagesLoaded + 1,
      search_string: selectAll ? null : searchString
    }

    const { results } = await loadMarvelCharacters(params);

    const newResults = characters.concat(results);
    setCharacters(newResults);
    setCurrentPagesLoaded(currentPagesLoaded + 1);

    setLoading(false);
  }

  async function handleSearchCharater() {

    setLoading(true);

    const params = {
      limit: process.env.REACT_APP_LIMIT_PER_PAGE,
      page: 0,
      search_string: searchString === "" ? null : searchString
    }

    const { total, results } = await loadMarvelCharacters(params);

    setCharacters(results);
    setCurrentPagesLoaded(0);
    setTotalCharacters(total);
    setSelectAll(false);

    setLoading(false);
  }

  return (
    <MainContainer>
      <img src="home_banner.png" alt="" style={{ width: "100%" }} />

      <Subtitle>All your favorite characters are here!</Subtitle>

      <RowContainer>
        <InputSearch
          value={searchString}
          onChange={e => setSearchString(e.target.value)}
          placeholder="Find yours"
        />
        <IconButton
          color="default"
          component="span"
          style={{ padding: "5px" }}
          onClick={() => handleSearchCharater()}
        >
          <SearchIcon />
        </IconButton>
      </RowContainer>

      <CharactersContainer>
        {characters &&
          characters.map((character, index) => {
            return <CharacterCard key={index} character={character} />
          })
        }
      </CharactersContainer>

      {errorMessage !== "" &&
        <p style={{ color: "#F00", fontSize: "30px", margin: "20px 0px 100px 0px", fontFamily: "Fira Sans" }}>{errorMessage}</p>
      }

      {(characters.length > 0) &&
        !loading && (<InfiniteScroll listMore={() => listMore()} />)
      }

    </MainContainer>
  );
}

export default Home;
