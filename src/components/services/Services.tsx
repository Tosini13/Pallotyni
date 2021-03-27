import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";

import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import { Service } from "../../stores/ServiceStore";
import { Confession } from "../../stores/ConfessionStore";
import ServiceMenu from "./ServiceMenu";
import SpeedDialComponent from "../SpeedDial";
import ServicesView from "./ServicesView";
import ConfessionsView from "./confessions/ConfessionsView";

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
  const [selectedConfession, setSelectedConfession] = useState<
    Confession | undefined
  >();

  const [currentTab, setCurrentTab] = useState<E_SERVICE_TAB>(
    E_SERVICE_TAB.SERVICES
  );

  const handleClearActionsSD = () => {
    setRemoval(false);
    setEdition(false);
    setOpenForm(false);
    setSelectedService(undefined);
    setSelectedConfession(undefined);
  };

  const actionsSD = [
    { icon: <AddIcon onClick={() => setOpenForm(true)} />, name: "Add" },
    { icon: <EditIcon onClick={() => setEdition(true)} />, name: "Edit" },
    { icon: <DeleteIcon onClick={() => setRemoval(true)} />, name: "Delete" },
  ];

  useEffect(() => {
    handleClearActionsSD();
  }, [currentTab]);

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
      {currentTab === E_SERVICE_TAB.CONFESSIONS ? (
        <ConfessionsView
          openForm={openForm}
          edition={edition}
          removal={removal}
          selectedConfession={selectedConfession}
          setSelectedConfession={setSelectedConfession}
          handleClearActionsSD={handleClearActionsSD}
        />
      ) : null}
    </>
  );
});

export default Services;
