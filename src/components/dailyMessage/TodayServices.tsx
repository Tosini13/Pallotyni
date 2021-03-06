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
import { ServiceStoreContext } from "../../stores/ServiceStore";
import { DATE_FORMAT, Day } from "../../models/Global";
import { mainTheme } from "../../style/config";

const ServiceDescTypographyStyled = styled(Typography)`
  margin-left: 5px;
`;

const ServiceTimeTypographyStyled = styled(Typography)`
  color: rgba(0, 0, 0, 0.8);
`;

const PaperStyled = styled(Paper)`
  background-color: ${mainTheme.palette.secondary.main};
  padding: 10px;
`;

export interface TodayServicesProps {}

const TodayServices: React.FC<TodayServicesProps> = () => {
  const servicesStore = useContext(ServiceStoreContext);
  const todayDay = moment().format("dddd").toUpperCase();
  const todayServices = [
    ...servicesStore.getServicesByDay(todayDay as Day),
    ...servicesStore.getServicesByDate({
      toDate: moment().format(DATE_FORMAT),
    }),
  ];
  todayServices.sort(servicesStore.sortByTime);

  if (!todayServices.length) {
    return (
      <PaperStyled>
        <Typography>Today's no services</Typography>
      </PaperStyled>
    );
  }
  return (
    <AccordionStyled defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Today's Services</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {todayServices.map((service) => (
            <ListItem key={service.id}>
              <ServiceTimeTypographyStyled>
                {service.time}
              </ServiceTimeTypographyStyled>
              <ServiceDescTypographyStyled>
                {service.title}
              </ServiceDescTypographyStyled>
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </AccordionStyled>
  );
};

export default TodayServices;
