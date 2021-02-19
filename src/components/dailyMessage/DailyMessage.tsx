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

export interface DailyMessageProps {}

const DailyMessage: React.FC<DailyMessageProps> = () => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>
              Today is {moment().format("dddd")} -{" "}
              {moment().format("DD.MM.YYYY")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Today's Services</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <ul>
                <li>10:00 - blah</li>
                <li>12:00 - blah</li>
                <li>18:30 - blah</li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default DailyMessage;
