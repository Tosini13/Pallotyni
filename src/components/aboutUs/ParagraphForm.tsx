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
import { ButtonSuccess, ButtonError } from "../../componentsReusable/Buttons";
import TextFieldC, { TextFieldStyled } from "../../componentsReusable/Forms";
import {
  ParagraphStoreContext,
  TParagraph,
  TParagraphCreate,
} from "../../stores/AboutUsStore";
import { mainTheme } from "../../style/config";

const DialogStyled = styled(Dialog)`
  .MuiDialog-paper {
    width: 99vw;
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

  const handleCloseForm = () => {
    handleClose();
    clearForm();
  };

  const onSubmit = (data: TParagraphCreate) => {
    if (selectedParagraph) {
      pStore.updateParagraph({ ...data, id: selectedParagraph.id });
    } else {
      pStore.createParagraph(data);
    }
    handleCloseForm();
  };

  useEffect(() => {
    reset(selectedParagraph);
  }, [reset, selectedParagraph]);

  return (
    <DialogStyled open={open} onClose={handleCloseForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          {selectedParagraph ? "Edit" : "Create"} Paragraph
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextFieldC
                inputRef={register}
                name="title"
                label="title"
                color="secondary"
              />
            </Grid>
            <Grid item>
              <TextFieldC
                multiline
                inputRef={register}
                name="content"
                label="paragraph"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <ButtonSuccess type="submit">
            {selectedParagraph ? "Update" : "Create"}
          </ButtonSuccess>
          <ButtonError onClick={handleCloseForm}>Cancel</ButtonError>
        </DialogActions>
      </form>
    </DialogStyled>
  );
};

export default ParagraphForm;
