import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background-color: #000;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  background-color: #C01309;
  align-items: center;
  justify-content: left;
  border-top: 5px solid #fff;
  border-bottom: 5px solid #fff;
`;

export const TitleText = styled.p`
  color: #FFF;
  font-size: 44px;
  margin: 30px;
  font-style: italic;
`;

export const ListTitle = styled.p`
  color: #fff;
  font-family: "Fira Sans";
  font-size: 30px;

  @media (max-width: 530px) {
    font-size: 22px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;

  @media (max-width: 1020px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ImgContainer = styled.img`
  width: 50%;

  @media (max-width: 1020px) {
    width: 70%;
  }
`;

export const SeriesContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: baseline;
  width: 50%;
  padding: 30px 50px;

  @media (max-width: 1020px) {
    align-items: center;
    width: 80%;
  }
`;

export const SeriesTitle = styled.li`
  color: #fff;
  font-family: "Fira Sans";
  font-size: 20px;
  padding-left: 10px;
  margin-bottom: 20px;

  @media (max-width: 530px) {
    font-size: 18px;
  }
`;

export const PagesContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 5px;

  @media (max-width: 1020px) {
    justify-content: center;
  }
`;

export const PageBox = styled.p`
  font-size: 18px;
  color: #fff;
  border: 1px solid #fff;
  padding: 5px 10px;
  margin-right: 10px;
  cursor: pointer;
  background-color: ${props => props.selected ? "#C01309" : "#000"};
`;

export const UlList = styled.ul`
  height: ${props => (props.max_per_page * 49).toString() + "px"};

  @media (max-width: 1020px) {
    height: auto;
  }
`;


