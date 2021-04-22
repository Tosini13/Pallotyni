import { useContext } from "react";
import { useHistory } from "react-router";
import { GALLERY_PATH } from "../../../models/const";
import { GetRoute } from "../../../models/Global";
import { AlbumStoreContext } from "../../../stores/GalleryStore";
import { ImgStyled } from "../../../style/MainStyled";

export interface HomeAlbumProps {}

const HomeAlbum: React.FC<HomeAlbumProps> = () => {
  const router = useHistory();
  const store = useContext(AlbumStoreContext);
  const newestAlbum = store.albums[0];
  return (
    <ImgStyled
      src={`${GALLERY_PATH}/${newestAlbum.coverPhoto?.path}`}
      alt={newestAlbum.coverPhoto?.path}
      onClick={() => router.push(GetRoute.album(newestAlbum.id))}
    />
  );
};

export default HomeAlbum;
