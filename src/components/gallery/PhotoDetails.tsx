import React, { useContext } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import { Photograph } from "../../stores/GalleryStore";
import styled from "styled-components";
import { mainTheme } from "../../style/config";

const DialogStyled = styled(Dialog)`
  .MuiDialog-paper {
    background-color: ${mainTheme.palette.primary.main};
    color: ${mainTheme.palette.text.primary};
  }
`;

export interface PhotoDetailsProps {
  photo: Photograph;
  open: boolean;
  handleClose: () => void;
}

const PhotoDetails: React.FC<PhotoDetailsProps> = ({
  photo,
  open,
  handleClose,
}) => {
  return (
    <DialogStyled open={open} onClose={handleClose}>
      <div style={{ position: "relative" }}>
        <img
          src={photo.path}
          style={{ maxHeight: "400px", maxWidth: "360px" }}
        />
        <DialogContent>
          <Typography variant="body2" align="right">
            {photo.createdAt}
          </Typography>
          <Typography variant="body1">{photo.description}</Typography>
        </DialogContent>
      </div>
    </DialogStyled>
  );
};

export default PhotoDetails;
