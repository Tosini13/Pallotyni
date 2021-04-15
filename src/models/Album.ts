import { Id } from "./Global";

export type TAlbum = {
  id: Id;
  title: string;
  description: string;
  photos: string[];
};

export type TAlbumCreate = Omit<TAlbum, "id" | "photos">;
