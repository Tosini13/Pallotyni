import React, { useContext, useState } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";

import { Grid, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  Photograph,
  photosStore,
  PhotosStoreContext,
} from "../../stores/GalleryStore";
import PhotoDetails from "./PhotoDetails";
import { Id } from "../../models/Global";
import { SpeedDialContainer } from "../../style/SpeedDial";
import SpeedDialComponent from "../SpeedDial";
import QuestionDialog from "../../componentsReusable/Dialogs";
import { ButtonError, ButtonSuccess } from "../../componentsReusable/Buttons";
import { parseStyledBoolean } from "../../helpers/BooleanParser";
import PhotoSummary from "./PhotoSummary";
import PhotoForm from "./PhotoForm";

const ImgStyled = styled.img<{ action?: string }>`
  height: 150px;
  border-radius: 3px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    ${(props) =>
      props.action
        ? `background-color: rgba(0, 0, 0, 0.4);`
        : `
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
    transform: translate(-3px, -3px);`}
  }
`;

const ActionButtonStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  background-color: rgba(100, 100, 100, 0.8);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.24);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export interface GalleryProps {}

const Gallery: React.FC<GalleryProps> = observer(() => {
  const store = useContext(PhotosStoreContext);

  const [image, setImage] = useState<any>();
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [edition, setEdition] = useState<boolean>(false);
  const [removal, setRemoval] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photograph | undefined>();

  const actionsSD = [
    { icon: <AddIcon onClick={() => setOpenForm(true)} />, name: "Add" },
    { icon: <EditIcon onClick={() => setEdition(true)} />, name: "Edit" },
    { icon: <DeleteIcon onClick={() => setRemoval(true)} />, name: "Delete" },
  ];

  const handleClearActionsSD = () => {
    setRemoval(false);
    setEdition(false);
    setOpenForm(false);
    setSelectedPhoto(undefined);
  };

  return (
    <>
      <Typography variant="h6">Gallery</Typography>
      <SpeedDialContainer>
        <SpeedDialComponent
          actions={actionsSD}
          blocked={Boolean(edition || removal || openForm)}
          unBlock={handleClearActionsSD}
        />
      </SpeedDialContainer>
      <Grid container spacing={1}>
        {store.getPhotos().map((photo) => (
          <React.Fragment key={photo.id}>
            <Grid
              item
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              style={{ position: "relative", overflow: "hidden" }}
            >
              <PhotoSummary photo={photo} edition={edition} removal={removal} />
            </Grid>
            <PhotoDetails
              photo={photo}
              open={photo.id === selectedPhoto?.id && !removal && !edition}
              handleClose={() => setSelectedPhoto(undefined)}
            />
          </React.Fragment>
        ))}
      </Grid>
      <PhotoForm
        image={image}
        setImage={setImage}
        open={Boolean((openForm || selectedPhoto) && !removal)}
        selectedPhotograph={openForm ? selectedPhoto : undefined}
        handleClose={handleClearActionsSD}
      />
      <QuestionDialog
        open={Boolean(selectedPhoto && removal)}
        handleClose={handleClearActionsSD}
        title="Do you want to delete?"
        content="Do you want to delete?"
      >
        <ButtonSuccess
          onClick={() => {
            if (selectedPhoto) {
              store.removePhoto(selectedPhoto);
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

export default Gallery;
