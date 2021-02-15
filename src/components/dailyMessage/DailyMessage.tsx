import React from "react";
import moment from "moment";

import { Grid, Typography } from "@material-ui/core";

export interface DailyMessageProps {}

const DailyMessage: React.FC<DailyMessageProps> = () => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography>
          Today is {moment().format("dddd")} - {moment().format("DD.MM.YYYY")}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DailyMessage;
