import { Button, Grid, GridSize } from "@material-ui/core";
import { useState } from "react";
import { Album } from "../../stores/AlbumStore";
import { MainGridStyled, TitleTypography } from "../../style/MainStyled";
import PhotosForm from "../gallery/PhotosForm";

const breakpoints = {
  md: 5 as GridSize,
  xs: 12 as GridSize,
};

export interface AlbumSummaryProps {
  album: Album;
  handleAction: (a: Album) => void;
}

const AlbumSummary: React.FC<AlbumSummaryProps> = ({
  album,
  handleAction,
  children,
}) => {
  const [images, setImages] = useState<object[]>([]);
  const [openForm, setOpenForm] = useState<boolean>(false);
  return (
    <>
      <MainGridStyled
        md={breakpoints.md}
        item
        key={album.id}
        onClick={() => handleAction(album)}
        style={{
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <TitleTypography>{album.title}</TitleTypography>
          </Grid>
          <Grid item>{children}</Grid>
          <Grid item>
            <Button onClick={() => setOpenForm(true)}>Add Photos</Button>
          </Grid>
        </Grid>
      </MainGridStyled>
      <PhotosForm
        images={images}
        setImages={setImages}
        open={openForm}
        handleClose={() => setOpenForm(false)}
        selectedAlbum={album}
      />
    </>
  );
};

export default AlbumSummary;
