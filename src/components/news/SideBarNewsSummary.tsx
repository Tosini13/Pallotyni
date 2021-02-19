import React, { useContext, useState } from "react";
import styled from "styled-components";

import { Grid, Paper, Typography } from "@material-ui/core";
import { News } from "../../stores/News";

const backgroundColor = "rgb(210, 210, 210)";
const PaperStyled = styled(Paper)`
  padding: 10px;
  background-color: ${backgroundColor};
  cursor: pointer;
  position: relative;
  max-height: 20vh;
  overflow: hidden;
`;

const ContentTypographyStyled = styled(Typography)`
  height: 40%;
`;

const ReadMoreStyled = styled.div<{
  open: boolean;
}>`
  position: absolute;
  bottom: 0px;
  left: 0px;
  background-color: ${backgroundColor};
  box-shadow: 0px -6px 4px ${backgroundColor};
  width: 100%;
  height: 20px;
  padding: 3px 10px;
  transition: all 0.3s;
  ${(props) =>
    props.open ? "transform: translateY(0%);" : "transform: translateY(100%);"}
`;

export interface SideBarNewsSummaryProps {
  news: News;
}

const SideBarNewsSummary: React.FC<SideBarNewsSummaryProps> = ({ news }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <PaperStyled
      onMouseEnter={() => setReadMore(true)}
      onMouseLeave={() => setReadMore(false)}
    >
      <Typography variant="h6">{news.title}</Typography>
      <ContentTypographyStyled variant="body2">
        {news.content}
      </ContentTypographyStyled>
      <ReadMoreStyled open={readMore}>
        <Typography variant="subtitle2">Read more...</Typography>
      </ReadMoreStyled>
    </PaperStyled>
  );
};

export default SideBarNewsSummary;
