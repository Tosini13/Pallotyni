import { Id } from "./Global";

const SERVER_URL = "http://localhost:3013";
const API_URL = `${SERVER_URL}/api`;
export const PARAGRAPH_API_URL = `${API_URL}/paragraphs`;
export const SERVICES_API_URL = `${API_URL}/services`;
export const CONFESSIONS_API_URL = `${API_URL}/confessions`;
export const NEWS_API_URL = `${API_URL}/news`;
export const ALBUM_API_URL = `${API_URL}/albums`;
export const ADD_MANY_PHOTOS_TO_ALBUM_API_URL = `${API_URL}/albumsAddManyPhotos`;
export const IMAGES_API_URL = `${API_URL}/images`;
export const MANY_IMAGES_API_URL = `${API_URL}/many-images`;
export const PHOTOGRAPHS_API_URL = `${API_URL}/photographs`;
export const ALBUM_PHOTOGRAPHS_API_URL = `${API_URL}/albums/:albumId/photographs/:photographId`;
export const GALLERY_PATH = `${SERVER_URL}/gallery`;

type TAlbumPhotographsUrlParams = { photographId: Id; albumId: Id };
export const getAlbumPhotographsUrl = ({
  photographId,
  albumId,
}: TAlbumPhotographsUrlParams) => {
  return `${API_URL}/albums/${albumId}/photographs/${photographId}`;
};
