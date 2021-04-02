import { useContext, useEffect } from "react";
import { format } from "date-fns";
import { DATE_FORMAT, Day } from "../../../models/Global";
import {
  Confession,
  ConfessionStoreContext,
} from "../../../stores/ConfessionStore";
import { TypographySelectableStyled } from "../ServicesView";
import { parseStyledBoolean } from "../../../helpers/BooleanParser";
import QuestionDialog from "../../../componentsReusable/Dialogs";
import {
  ButtonError,
  ButtonSuccess,
} from "../../../componentsReusable/Buttons";
import ConfessionForm from "./forms/ConfessionForm";

export interface ConfessionsViewProps {
  openForm: boolean;
  edition: boolean;
  removal: boolean;
  selectedConfession?: Confession;
  setSelectedConfession: (s: Confession) => void;
  handleClearActionsSD: () => void;
}

const ConfessionsView: React.FC<ConfessionsViewProps> = ({
  openForm,
  edition,
  removal,
  selectedConfession,
  setSelectedConfession,
  handleClearActionsSD,
}) => {
  const storeConfession = useContext(ConfessionStoreContext);
  const handleSelectConfession = (confession: Confession) => {
    if (edition || removal) {
      setSelectedConfession(confession);
    }
  };

  useEffect(() => {
    storeConfession.fetch();
  }, []);

  return (
    <>
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
        {storeConfession.getConfessionsNextWeek().map((confession) => (
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
};

export default ConfessionsView;
