import React from "react";

import { Grid, Paper, Typography } from "@material-ui/core";
import styled from "styled-components";

const PaperStyled = styled(Paper)`
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.23);
  cursor: pointer;
`;

export interface SideBarNewsProps {}

const SideBarNews: React.FC<SideBarNewsProps> = () => {
  const newses = [
    {
      title: "News",
      description: "Description",
    },
    {
      title: "News 2",
      description: "Description1",
    },
  ];
  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <Typography variant="h5" align="center">
          Newsy
        </Typography>
      </Grid>
      {newses.map((news) => (
        <Grid item>
          <PaperStyled>
            <Typography variant="h6">{news.title}</Typography>
            <Typography>{news.description}</Typography>
          </PaperStyled>
        </Grid>
      ))}
    </Grid>
  );
};

export default SideBarNews;
