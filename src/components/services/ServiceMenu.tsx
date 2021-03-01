import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { E_SERVICE_TAB } from "./Services";
import styled from "styled-components";

const TabsStyled = styled(Tabs)``;

export interface ServiceMenuProps {
  setCurrentTab: (tab: E_SERVICE_TAB) => void;
}

const ServiceMenu: React.FC<ServiceMenuProps> = ({ setCurrentTab }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        setCurrentTab(E_SERVICE_TAB.SERVICES);
        break;
      case 1:
        setCurrentTab(E_SERVICE_TAB.CONFESSIONS);
        break;
      default:
        setCurrentTab(E_SERVICE_TAB.SERVICES);
    }
  };
  return (
    <TabsStyled value={value} onChange={handleChange}>
      <Tab label="SERVICE" />
      <Tab label="CONFESSION" />
    </TabsStyled>
  );
};

export default ServiceMenu;
