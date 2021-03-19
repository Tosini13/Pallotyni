import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { DATE_FORMAT, Day } from "../../../models/Global";
import { format } from "date-fns";
import DatePickerSwitch from "./DatePickerSwitch";

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
  const sStore = useContext(ServiceStoreContext);
  const { register, handleSubmit, reset } = useForm<TServiceForm>();

  const [repeat, setRepeat] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date() ?? format(new Date(), DATE_FORMAT)
  );
  const [selectedDays, setSelectedDays] = useState<Day[]>(
    selectedService?.days ?? []
  );

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
    setSelectedDate(
      selectedService?.date ? new Date(selectedService?.date) : new Date()
    );
    setRepeat(Boolean(selectedService?.days?.length));
  }, [reset, selectedService]);

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
