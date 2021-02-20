import React, { useContext } from "react";

import { Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import jack from "../../images/mock/jack.jpg";
import bratislava from "../../images/mock/bratislava.jpg";
import budapest from "../../images/mock/budapest.jpg";
import girne from "../../images/mock/girne.jpg";
import lefkosa from "../../images/mock/lefkosa.jpg";
import madrid from "../../images/mock/madrid.jpg";
import touluse from "../../images/mock/touluse.jpg";
import wien from "../../images/mock/wien.jpg";
import { PhotosStoreContext } from "../../stores/Gallery";

const ImgStyled = styled.img`
  height: 150px;
  border-radius: 3px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  cursor: pointer;
`;

export interface GalleryProps {}

const Gallery: React.FC<GalleryProps> = () => {
  const { getPhotos } = useContext(PhotosStoreContext);
  return (
    <>
      <Typography variant="h6">Gallery</Typography>
      <Grid container spacing={1}>
        <Grid item>
          <ImgStyled src={bratislava} alt="bratislava" />
        </Grid>
        <Grid item>
          <ImgStyled src={budapest} alt="budapest" />
        </Grid>
        <Grid item>
          <ImgStyled src={jack} alt="jack" />
        </Grid>
        <Grid item>
          <ImgStyled src={girne} alt="girne" />
        </Grid>
        <Grid item>
          <ImgStyled src={lefkosa} alt="lefkosa" />
        </Grid>
        <Grid item>
          <ImgStyled src={madrid} alt="madrid" />
        </Grid>
        <Grid item>
          <ImgStyled src={touluse} alt="touluse" />
        </Grid>
        <Grid item>
          <ImgStyled src={wien} alt="wien" />
        </Grid>
        {getPhotos().map((photo) => (
          <Grid item>
            <ImgStyled src={photo.path} alt="wien" />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Gallery;
