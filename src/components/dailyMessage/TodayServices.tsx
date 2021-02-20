import React from "react";
import styled from "styled-components";

import {
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { AccordionStyled } from "./DailyMessage";

const ServiceDescTypographyStyled = styled(Typography)`
  margin-left: 5px;
`;

const ServiceTimeTypographyStyled = styled(Typography)`
  color: rgba(0, 0, 0, 0.8);
`;
export interface TodayServicesProps {}

const TodayServices: React.FC<TodayServicesProps> = () => {
  return (
    <AccordionStyled defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Today's Services</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {services.map((service) => (
            <ListItem>
              <ServiceTimeTypographyStyled>
                {service.time}
              </ServiceTimeTypographyStyled>
              <ServiceDescTypographyStyled>
                {service.description}
              </ServiceDescTypographyStyled>
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </AccordionStyled>
  );
};

export default TodayServices;

const services = [
  {
    time: "10:00",
    description: "For students of primary school",
  },
  {
    time: "12:00",
    description: "For the all prayers",
  },
  {
    time: "18:30",
    description: "For students of universities",
  },
];
