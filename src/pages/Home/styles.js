import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background-color: #000;
`;

export const RowContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 350px;
  background-color: #FFFFFF;
  justify-content: space-between;
  margin: 10px 0px 10px 0px;

  @media (max-width: 530px) {
    width: 70%;
  }
`;

export const CharactersContainer = styled.div`
  display: flex;
  flex: 1;
  flex-flow: wrap;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  justify-content: center;
`;

export const Subtitle = styled.p`
  color: #F00;
  font-size: 30px;
  margin: 0px;
  font-family: "Fira Sans";

  @media (max-width: 530px) {
    width: 70%;
    text-align: center;
    font-size: 18px;
  }
`;

export const InputSearch = styled.input`
  border: 0px;
  width: 350px;
  outline: none;
  font-size: 18px;
  padding: 0px 10px;

  @media (max-width: 530px) {
    width: 70%;
  }
`;

