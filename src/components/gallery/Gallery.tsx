import React, { useContext, useState } from "react";
import { observer } from "mobx-react";

import { Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import { PhotosStoreContext } from "../../stores/GalleryStore";
import PhotoDetails from "./PhotoDetails";
import { Id } from "../../models/Global";

const ImgStyled = styled.img`
  height: 150px;
  border-radius: 3px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
    transform: translate(-3px, -3px);
  }
`;

export interface GalleryProps {}

const Gallery: React.FC<GalleryProps> = observer(() => {
  const store = useContext(PhotosStoreContext);

  const [selectedPhotoId, setSelectedPhotoId] = useState<Id | undefined>();
  return (
    <>
      <Typography variant="h6">Gallery</Typography>
      <Grid container spacing={1}>
        {store.getPhotos().map((photo) => (
          <>
            <Grid
              item
              key={photo.id}
              onClick={() => setSelectedPhotoId(photo.id)}
            >
              <ImgStyled src={photo.path} alt={photo.path} />
            </Grid>
            <PhotoDetails
              photo={photo}
              open={photo.id === selectedPhotoId}
              handleClose={() => setSelectedPhotoId(undefined)}
            />
          </>
        ))}
      </Grid>
    </>
  );
});

export default Gallery;
