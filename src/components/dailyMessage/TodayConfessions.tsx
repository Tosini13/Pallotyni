import React, { useContext } from "react";
import moment from "moment";
import styled from "styled-components";

import {
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  Paper,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { AccordionStyled } from "./DailyMessage";
import { Day } from "../../models/Global";
import { mainTheme } from "../../style/config";
import { ConfessionStoreContext } from "../../stores/ConfessionStore";

const ConfessionDescTypographyStyled = styled(Typography)`
  margin-left: 5px;
`;

const ConfessionTimeTypographyStyled = styled(Typography)`
  color: rgba(0, 0, 0, 0.8);
`;

const PaperStyled = styled(Paper)`
  background-color: ${mainTheme.palette.secondary.main};
  padding: 10px;
`;

export interface TodayConfessionsProps {}

const TodayConfessions: React.FC<TodayConfessionsProps> = () => {
  const confessionsStore = useContext(ConfessionStoreContext);
  const todayDay = moment().format("dddd").toUpperCase();
  const todayConfessions = confessionsStore.getConfessionsByDay(
    todayDay as Day
  );
  if (!todayConfessions.length) {
    return (
      <PaperStyled>
        <Typography>Today's no Confessions</Typography>
      </PaperStyled>
    );
  }
  return (
    <AccordionStyled defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Today's Confessions</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {todayConfessions.map((confession) => (
            <ListItem key={confession.id}>
              <ConfessionTimeTypographyStyled>
                {confession.fromTime} - {confession.toTime}
              </ConfessionTimeTypographyStyled>
              <ConfessionDescTypographyStyled>
                {confession.title}
              </ConfessionDescTypographyStyled>
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </AccordionStyled>
  );
};

export default TodayConfessions;
