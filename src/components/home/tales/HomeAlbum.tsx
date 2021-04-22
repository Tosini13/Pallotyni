import { Grid } from "@material-ui/core";
import { useContext } from "react";
import { useHistory } from "react-router";
import { GALLERY_PATH } from "../../../models/const";
import { GetRoute } from "../../../models/Global";
import { AlbumStoreContext } from "../../../stores/GalleryStore";
import { ImgStyled, TitleTypography } from "../../../style/MainStyled";

export interface HomeAlbumProps {}

const HomeAlbum: React.FC<HomeAlbumProps> = () => {
  const router = useHistory();
  const store = useContext(AlbumStoreContext);
  const newestAlbum = store.albums[0];
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <TitleTypography>Najnowsze Albumy</TitleTypography>
      </Grid>
      <Grid item>
        <ImgStyled
          src={`${GALLERY_PATH}/${newestAlbum.coverPhoto?.path}`}
          alt={newestAlbum.coverPhoto?.path}
          onClick={() => router.push(GetRoute.album(newestAlbum.id))}
        />
      </Grid>
    </Grid>
  );
};

export default HomeAlbum;
