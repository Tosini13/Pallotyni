import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";

import { DialogStyled } from "../../../../componentsReusable/Dialogs";
import TextFieldC from "../../../../componentsReusable/Forms";
import { DATE_FORMAT, Day } from "../../../../models/Global";
import {
  Confession,
  ConfessionStoreContext,
  TCreateConfession,
} from "../../../../stores/ConfessionStore";
import DatePickerSwitch from "../../forms/DatePickerSwitch";
import {
  ButtonError,
  ButtonSuccess,
} from "../../../../componentsReusable/Buttons";

type TConfessionForm = TCreateConfession;

export interface ConfessionFormProps {
  open: boolean;
  selectedConfession?: Confession;
  handleClose: () => void;
}

const ConfessionForm: React.FC<ConfessionFormProps> = ({
  open,
  selectedConfession,
  handleClose,
}) => {
  const sConfession = useContext(ConfessionStoreContext);
  const { register, handleSubmit, reset } = useForm<TConfessionForm>();

  const [repeat, setRepeat] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date() ?? format(new Date(), DATE_FORMAT)
  );
  const [selectedDays, setSelectedDays] = useState<Day[]>(
    selectedConfession?.days ?? []
  );

  const clearForm = () => {
    reset({
      title: "",
      fromTime: "12:00",
      toTime: "12:30",
      priest: "",
    });
  };

  const handleCloseForm = () => {
    clearForm();
    handleClose();
  };

  const onSubmit = (data: TConfessionForm) => {
    console.log(data);
    if (selectedConfession) {
      sConfession.updateService({
        title: data.title,
        priest: data.priest,
        fromTime: data.fromTime,
        toTime: data.toTime,
        days: repeat ? selectedDays : undefined,
        date:
          !repeat && selectedDate
            ? format(selectedDate, DATE_FORMAT)
            : undefined,
        id: selectedConfession.id,
      });
    } else {
      sConfession.addConfession({
        title: data.title,
        priest: data.priest,
        fromTime: data.fromTime,
        toTime: data.toTime,
        days: repeat ? selectedDays : undefined,
        date:
          !repeat && selectedDate
            ? format(selectedDate, DATE_FORMAT)
            : undefined,
      });
    }
    handleCloseForm();
  };

  useEffect(() => {
    reset(selectedConfession);
    setSelectedDays(selectedConfession?.days ?? []);
    setSelectedDate(
      selectedConfession?.date ? new Date(selectedConfession?.date) : new Date()
    );
    setRepeat(Boolean(selectedConfession?.days?.length));
  }, [reset, selectedConfession]);

  return (
    <DialogStyled open={open} onClose={handleCloseForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          {selectedConfession ? "Edit" : "Create"} Service
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={6}>
              <TextFieldC
                required
                inputRef={register}
                name="title"
                label="Title"
                color="secondary"
              />
            </Grid>
            <Grid item md={6}>
              <TextFieldC
                multiline
                inputRef={register}
                name="priest"
                label="Priest"
              />
            </Grid>
            <DatePickerSwitch
              register={register}
              repeat={repeat}
              setRepeat={setRepeat}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedDays={selectedDays}
              setSelectedDays={setSelectedDays}
            />
            <Grid item md={3}>
              <TextFieldC
                required
                label="From time"
                type="time"
                defaultValue={"12:00"}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 60,
                }}
                inputRef={register}
                name="fromTime"
              />
            </Grid>
            <Grid item md={3}>
              <TextFieldC
                required
                label="To time"
                type="time"
                defaultValue={"12:00"}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 60,
                }}
                inputRef={register}
                name="toTime"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <ButtonSuccess type="submit">
            {selectedConfession ? "Update" : "Create"}
          </ButtonSuccess>
          <ButtonError onClick={handleCloseForm}>Cancel</ButtonError>
        </DialogActions>
      </form>
    </DialogStyled>
  );
};

export default ConfessionForm;
