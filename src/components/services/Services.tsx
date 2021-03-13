import React, { useContext, useState } from "react";
import moment from "moment";
import { observer } from "mobx-react";
import styled from "styled-components";

import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import { DATE_FORMAT, Day } from "../../models/Global";
import { Service, ServiceStoreContext } from "../../stores/ServiceStore";
import { ConfessionStoreContext } from "../../stores/ConfessionStore";
import ServiceMenu from "./ServiceMenu";
import SpeedDialComponent from "../SpeedDial";
import ServicesView from "./ServicesView";
import ConfessionsView from "./ConfessionsView";

const SpeedDialContainer = styled.div`
  position: fixed;
  right: 25%;
  z-index: 1110;
`;

export enum E_SERVICE_TAB {
  "SERVICES" = "SERVICES",
  "CONFESSIONS" = "CONFESSIONS",
}

export interface ServicesProps {}

const Services: React.FC<ServicesProps> = observer(() => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [edition, setEdition] = useState<boolean>(false);
  const [removal, setRemoval] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<Service | undefined>();

  const [currentTab, setCurrentTab] = useState<E_SERVICE_TAB>(
    E_SERVICE_TAB.SERVICES
  );

  const handleClearActionsSD = () => {
    setRemoval(false);
    setEdition(false);
    setOpenForm(false);
    setSelectedService(undefined);
  };

  const actionsSD = [
    { icon: <AddIcon onClick={() => setOpenForm(true)} />, name: "Add" },
    { icon: <EditIcon onClick={() => setEdition(true)} />, name: "Edit" },
    { icon: <DeleteIcon onClick={() => setRemoval(true)} />, name: "Delete" },
  ];

  return (
    <>
      <SpeedDialContainer>
        <SpeedDialComponent
          actions={actionsSD}
          blocked={Boolean(edition || removal || openForm)}
          unBlock={handleClearActionsSD}
        />
      </SpeedDialContainer>
      <ServiceMenu setCurrentTab={setCurrentTab} />
      {currentTab === E_SERVICE_TAB.SERVICES ? (
        <ServicesView
          openForm={openForm}
          edition={edition}
          removal={removal}
          selectedService={selectedService}
          selectService={setSelectedService}
          handleClearActionsSD={handleClearActionsSD}
        />
      ) : null}
      {currentTab === E_SERVICE_TAB.CONFESSIONS ? <ConfessionsView /> : null}
    </>
  );
});

export default Services;
