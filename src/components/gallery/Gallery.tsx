import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";

import { Grid, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import { Photograph, PhotosStoreContext } from "../../stores/GalleryStore";
import PhotoDetails from "./PhotoDetails";
import { SpeedDialContainer } from "../../style/SpeedDial";
import SpeedDialComponent from "../SpeedDial";
import QuestionDialog from "../../componentsReusable/Dialogs";
import { ButtonError, ButtonSuccess } from "../../componentsReusable/Buttons";
import PhotoSummary from "./PhotoSummary";
import PhotoForm from "./PhotoForm";

export interface GalleryProps {}

const Gallery: React.FC<GalleryProps> = observer(() => {
  const store = useContext(PhotosStoreContext);

  const [image, setImage] = useState<any>();
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [edition, setEdition] = useState<boolean>(false);
  const [removal, setRemoval] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photograph | undefined>();

  useEffect(() => {
    store.fetch();
  }, []);

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

  const handleAction = (p: Photograph) => {
    if (edition) {
      setSelectedPhoto(p);
      setOpenForm(true);
    }
    setSelectedPhoto(p);
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
              onClick={() => handleAction(photo)}
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
        open={Boolean(openForm && !removal)}
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
