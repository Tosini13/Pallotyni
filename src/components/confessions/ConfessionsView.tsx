import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";

import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import { DATE_FORMAT, Day } from "../../models/Global";
import {
  Confession,
  ConfessionStoreContext,
} from "../../stores/ConfessionStore";
import { parseStyledBoolean } from "../../helpers/BooleanParser";
import QuestionDialog from "../../componentsReusable/Dialogs";
import { ButtonError, ButtonSuccess } from "../../componentsReusable/Buttons";
import ConfessionForm from "./forms/ConfessionForm";
import { observer } from "mobx-react";
import SpeedDialComponent from "../SpeedDial";
import { SpeedDialContainer } from "../../style/SpeedDial";
import { TypographySelectableStyled } from "../services/ServicesView";

export interface ConfessionsViewProps {
  openForm: boolean;
  edition: boolean;
  removal: boolean;
  selectedConfession?: Confession;
  setSelectedConfession: (s: Confession) => void;
  handleClearActionsSD: () => void;
}

const ConfessionsView: React.FC<ConfessionsViewProps> = observer(({}) => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [edition, setEdition] = useState<boolean>(false);
  const [removal, setRemoval] = useState<boolean>(false);
  const [selectedConfession, setSelectedConfession] = useState<
    Confession | undefined
  >();
  const storeConfession = useContext(ConfessionStoreContext);
  const handleSelectConfession = (confession: Confession) => {
    if (edition || removal) {
      setSelectedConfession(confession);
    }
  };

  const handleClearActionsSD = () => {
    setRemoval(false);
    setEdition(false);
    setOpenForm(false);
    setSelectedConfession(undefined);
  };
  useEffect(() => {
    storeConfession.fetch();
  }, []);

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
      <div>
        <div>
          {Object.values(Day).map((day) => (
            <div key={day}>
              <h5>{day}</h5>
              {storeConfession.getConfessionsByDay(day).map((confession) => (
                <TypographySelectableStyled
                  key={confession.id}
                  selectable={parseStyledBoolean(edition || removal)}
                  onClick={() => handleSelectConfession(confession)}
                >
                  {confession.fromTime} - {confession.toTime} :{" "}
                  {confession.title}
                </TypographySelectableStyled>
              ))}
            </div>
          ))}
        </div>
        <p>Next week</p>
        {storeConfession.getConfessionsNextWeek.map((confession) => (
          <TypographySelectableStyled
            key={confession.id}
            selectable={parseStyledBoolean(edition || removal)}
            onClick={() => handleSelectConfession(confession)}
          >
            {format(new Date(confession.date ?? ""), DATE_FORMAT)}{" "}
            {confession.fromTime} - {confession.toTime}: {confession.title}
          </TypographySelectableStyled>
        ))}
      </div>
      <ConfessionForm
        open={Boolean((openForm || selectedConfession) && !removal)}
        selectedConfession={removal ? undefined : selectedConfession}
        handleClose={handleClearActionsSD}
      />
      <QuestionDialog
        open={Boolean(selectedConfession && removal)}
        handleClose={handleClearActionsSD}
        title="Do you want to delete?"
        content="Do you want to delete?"
      >
        <ButtonSuccess
          onClick={() => {
            if (selectedConfession) {
              storeConfession.removeConfession(selectedConfession);
              handleClearActionsSD();
            }
          }}
        >
          Yes
        </ButtonSuccess>
        <ButtonError onClick={handleClearActionsSD}>No</ButtonError>
      </QuestionDialog>
    </>
  );
});

export default ConfessionsView;
