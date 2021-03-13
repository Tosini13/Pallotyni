import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import {
  ButtonError,
  ButtonSuccess,
} from "../../../componentsReusable/Buttons";
import { DialogStyled } from "../../../componentsReusable/Dialogs";
import TextFieldC from "../../../componentsReusable/Forms";
import {
  Service,
  ServiceStoreContext,
  TServiceCreate,
} from "../../../stores/ServiceStore";
import styled from "styled-components";
import DayPicker from "./DayPicker";
import { DATE_FORMAT, Day } from "../../../models/Global";
import { format } from "date-fns";

const KeyboardDatePickerStyled = styled(KeyboardDatePicker)``;

type TServiceForm = TServiceCreate;

export interface ServiceFormProps {
  open: boolean;
  selectedService?: Service;
  handleClose: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({
  open,
  handleClose,
  selectedService,
}) => {
  console.log(Boolean(selectedService?.days?.length));
  const sStore = useContext(ServiceStoreContext);
  const { register, handleSubmit, reset } = useForm<TServiceForm>();
  const [repeat, setRepeat] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedDays, setSelectedDays] = useState<Day[]>(
    selectedService?.days ?? []
  );
  const handleSelect = (day: Day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const clearForm = () => {
    reset({
      title: "",
      time: "12:00",
      priest: "",
    });
  };
  const handleCloseForm = () => {
    handleClose();
    clearForm();
  };

  const onSubmit = (data: TServiceForm) => {
    console.log(data);
    if (repeat && !selectedDays.length) {
      console.log("select Days!");
    }
    console.log(selectedService);
    if (selectedService) {
      sStore.updateService({
        title: data.title,
        priest: data.priest,
        time: data.time,
        days: repeat ? selectedDays : undefined,
        date:
          !repeat && selectedDate
            ? format(selectedDate, DATE_FORMAT)
            : undefined,
        id: selectedService.id,
      });
    } else {
      sStore.createService({
        title: data.title,
        priest: data.priest,
        time: data.time,
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
    reset(selectedService);
    setSelectedDays(selectedService?.days ?? []);
    setSelectedDate(new Date(selectedService?.date ?? ""));
    setRepeat(Boolean(selectedService?.days?.length));
  }, [reset, selectedService]);
  console.log(selectedDate);

  return (
    <DialogStyled open={open} onClose={handleCloseForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{selectedService ? "Edit" : "Create"} Service</DialogTitle>
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
            <Grid item md={3}>
              <FormControlLabel
                value={repeat}
                checked={repeat}
                name="repeat"
                control={<Switch color="secondary" checked={repeat} />}
                label="Repeat"
                labelPlacement="end"
                inputRef={register}
                onClick={() => setRepeat(!repeat)}
              />
            </Grid>
            <Grid item md={9}>
              {repeat ? (
                <DayPicker
                  selected={selectedDays}
                  handleSelect={handleSelect}
                />
              ) : (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePickerStyled
                    label="Date picker dialog"
                    format={DATE_FORMAT}
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    color="secondary"
                  />
                </MuiPickersUtilsProvider>
              )}
            </Grid>
            <Grid item md={3}>
              <TextFieldC
                required
                label="Time"
                type="time"
                defaultValue={"12:00"}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 60,
                }}
                inputRef={register}
                name="time"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <ButtonSuccess type="submit">
            {selectedService ? "Update" : "Create"}
          </ButtonSuccess>
          <ButtonError onClick={handleCloseForm}>Cancel</ButtonError>
        </DialogActions>
      </form>
    </DialogStyled>
  );
};

export default ServiceForm;
