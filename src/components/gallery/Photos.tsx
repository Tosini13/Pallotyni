import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";

import { Grid, GridSize } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import { Photograph, PhotosStoreContext } from "../../stores/PhotographsStore";
import PhotoDetails from "./PhotoDetails";
import { SpeedDialContainer } from "../../style/SpeedDial";
import SpeedDialComponent from "../SpeedDial";
import QuestionDialog from "../../componentsReusable/Dialogs";
import { ButtonError, ButtonSuccess } from "../../componentsReusable/Buttons";
import PhotoSummary from "./PhotoSummary";
import PhotoForm from "./PhotoForm";
import BackgroundImg from "../../resources/images/church_cross.png";
import MainLayout from "../layout/MainLayout";
import { MainGridStyled } from "../../style/MainStyled";
import { AlbumStoreContext } from "../../stores/GalleryStore";
import { useParams } from "react-router";
import { Id } from "../../models/Global";
import { GALLERY_PATH } from "../../models/const";

const breakpoints = {
  md: 5 as GridSize,
  xs: 12 as GridSize,
};

export interface GalleryProps {}

const Gallery: React.FC<GalleryProps> = observer(() => {
  const { id: albumId } = useParams<{
    id: Id;
  }>();
  const storeAlbum = useContext(AlbumStoreContext);
  const storePhotos = useContext(PhotosStoreContext);
  const album = storeAlbum.getAlbum(albumId);
  console.log(album);
  const [image, setImage] = useState<any>();
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [edition, setEdition] = useState<boolean>(false);
  const [removal, setRemoval] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photograph | undefined>();

  useEffect(() => {
    storePhotos.fetch(albumId);
  }, [storePhotos, albumId]);

  useEffect(() => {
    storeAlbum.fetch();
  }, [storeAlbum]);

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

  console.log(
    "album?.photos",
    album?.photos.map((photo) => photo)
  );

  console.log(
    "storePhotos?.photos",
    storePhotos?.photos.map((photo) => photo)
  );

  return (
    <MainLayout img={BackgroundImg} title="Gallery">
      <SpeedDialContainer>
        <SpeedDialComponent
          actions={actionsSD}
          blocked={Boolean(edition || removal || openForm)}
          unBlock={handleClearActionsSD}
        />
      </SpeedDialContainer>
      <Grid container justify="space-around">
        {storePhotos?.photos.map((photo) => (
          <Grid item>
            <img
              src={`${GALLERY_PATH}/${photo.path}`}
              alt={photo.path}
              style={{ width: "300px" }}
            />
          </Grid>
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
              storePhotos.removePhoto(selectedPhoto);
              handleClearActionsSD();
            }
          }}
        >
          Yes
        </ButtonSuccess>
        <ButtonError onClick={handleClearActionsSD}>No</ButtonError>
      </QuestionDialog>
    </MainLayout>
  );
});

export default Gallery;
