import React from "react";
import moment from "moment";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@material-ui/core";

import { ExpandMore } from "@material-ui/icons";
import { mainTheme } from "../../style/config";
import styled from "styled-components";
import TodayServices from "./TodayServices";

export const AccordionStyled = styled(Accordion)`
  background-color: ${mainTheme.palette.secondary.main};
`;

export interface DailyMessageProps {}

const DailyMessage: React.FC<DailyMessageProps> = () => {
  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <AccordionStyled defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>
              Today is {moment().format("dddd")} -{" "}
              {moment().format("DD.MM.YYYY")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography>Name day of James and Caroline</Typography>
              </Grid>
              <Grid item>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </AccordionStyled>
      </Grid>
      <Grid item>
        <TodayServices />
      </Grid>
    </Grid>
  );
};

export default DailyMessage;
