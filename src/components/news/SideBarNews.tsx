import React, { useContext } from "react";

import { Grid, Typography } from "@material-ui/core";
import { NewStoreContext } from "../../stores/News";
import SideBarNewsSummary from "./SideBarNewsSummary";

export interface SideBarNewsProps {}

const SideBarNews: React.FC<SideBarNewsProps> = () => {
  const newsStore = useContext(NewStoreContext);

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <Typography variant="h5" align="center">
          Newest Newsy
        </Typography>
      </Grid>
      {newsStore.getAllNews().map((news) => (
        <Grid item key={news.id}>
          <SideBarNewsSummary news={news} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SideBarNews;
