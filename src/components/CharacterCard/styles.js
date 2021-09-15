import styled from "styled-components";


export const ImgContainer = styled.img`
  width: 200px;
  height: 150px;
  object-fit: cover;
`;

export const Line = styled.div`
  width: 200px;
  height: 6px;
  background-color: #FF0000;
  transition: height 0.15s linear;
  margin-top: -4px;
`;

export const CharacterName = styled.p`
  position: relative;
  top: 20px;
  left: 15px;
  color: #FFF;
  margin: 0;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  width: 120px;
  font-size: 13px;
`

export const MainContainer = styled.div`
  display: block;
  width: 150px;
  height: 250px;
  background-color: #000;
  border: 1px #fff solid;
  overflow: hidden;
  border-radius: 20px 10px;
  margin: 15px 25px;

  &:hover{
    ${Line} {
      height: 151px;
    }

    ${ImgContainer} {
      transform: scale(1.1);
    }
  }

`;

