import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import styled from "styled-components";
import { mainTheme } from "../style/config";

export const DialogStyled = styled(Dialog)`
  .MuiDialog-paper {
    width: 99vw;
    background-color: ${mainTheme.palette.primary.main};
  }
`;
export interface QuestionDialogProps {
  title?: string;
  content: string;
  open: boolean;
  handleClose: () => void;
}

const QuestionDialog: React.FC<QuestionDialogProps> = ({
  children,
  title,
  content,
  open,
  handleClose,
}) => {
  return (
    <DialogStyled open={open} onClose={handleClose}>
      {title ? <DialogTitle>{title}</DialogTitle> : null}
      <DialogContent>{content}</DialogContent>
      <DialogActions>{children}</DialogActions>
    </DialogStyled>
  );
};

export default QuestionDialog;
