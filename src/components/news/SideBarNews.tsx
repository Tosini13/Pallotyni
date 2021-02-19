import React, { useContext, useState } from "react";

import { Divider, Grid, Typography } from "@material-ui/core";
import { NewStoreContext } from "../../stores/News";
import SideBarNewsSummary from "./SideBarNewsSummary";
import SideBarNewsDetails from "./SideBarNewsDetails";
import { Id } from "../../models/Global";

export interface SideBarNewsProps {}

const SideBarNews: React.FC<SideBarNewsProps> = () => {
  const newsStore = useContext(NewStoreContext);

  const [selectedNews, setSelectedNews] = useState<undefined | Id>(undefined);

  return (
    <>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h5" align="center">
            Latest News
          </Typography>
        </Grid>
        {newsStore.getAllNews().map((news) => (
          <>
            <Grid item key={news.id} onClick={() => setSelectedNews(news.id)}>
              <SideBarNewsSummary news={news} />
            </Grid>
            <Divider
              style={{
                backgroundColor: "rgba(0,0,0,0.3)",
                width: "90%",
                margin: "auto",
              }}
            />
          </>
        ))}
      </Grid>
      {selectedNews ? (
        <SideBarNewsDetails
          open={selectedNews !== undefined}
          id={selectedNews}
          handleClose={() => setSelectedNews(undefined)}
        />
      ) : null}
    </>
  );
};

export default SideBarNews;
