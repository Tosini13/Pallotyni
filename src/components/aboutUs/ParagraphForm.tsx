import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Id } from "../../models/Global";
import {
  ParagraphStoreContext,
  TParagraph,
  TParagraphCreate,
} from "../../stores/AboutUsStore";
import { mainTheme } from "../../style/config";

const TextFieldStyled = styled(TextField)`
  color: ${mainTheme.palette.text.primary};
  label {
    color: ${mainTheme.palette.text.primary};
  }
`;

export interface ParagraphFormProps {
  open: boolean;
  selectedParagraph?: TParagraph;
  handleClose: () => void;
}

const ParagraphForm: React.FC<ParagraphFormProps> = ({
  open,
  handleClose,
  selectedParagraph,
}) => {
  const pStore = useContext(ParagraphStoreContext);
  const { register, handleSubmit, reset } = useForm<TParagraphCreate>();

  const clearForm = () => {
    reset({
      title: "",
      content: "",
    });
  };

  const onSubmit = (data: TParagraphCreate) => {
    if (selectedParagraph) {
      pStore.updateParagraph({ ...data, id: selectedParagraph.id });
    } else {
      pStore.createParagraph(data);
    }
    clearForm();
    handleClose();
  };

  useEffect(() => {
    reset(selectedParagraph);
  }, [reset, selectedParagraph]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        clearForm();
        handleClose();
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          {selectedParagraph ? "Edit" : "Create"} Paragraph
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column">
            <Grid item>
              <TextFieldStyled inputRef={register} name="title" label="title" />
            </Grid>
            <Grid item>
              <TextFieldStyled
                multiline
                inputRef={register}
                name="content"
                label="paragraph"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit">
            {selectedParagraph ? "Update" : "Create"}
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ParagraphForm;
