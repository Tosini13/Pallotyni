import React from "react";
import axios from "axios";

import { action, makeObservable, observable } from "mobx";
import { Id } from "../models/Global";
import { ALBUM_API_URL } from "../models/const";
import { TAlbum, TAlbumCreate } from "../models/Album";

type TAlbumProps = Omit<TAlbum, "createdAt"> & {
  createdAt?: string;
};

export class Album {
  @observable
  id: Id;

  @observable
  title: string;

  @observable
  description: string;

  @observable
  photos: string[];

  constructor({ id, title, description, photos }: TAlbumProps) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.photos = photos;
  }
}

export class AlbumStore {
  albums: Album[] = [];

  async fetch() {
    const data = await axios.get(ALBUM_API_URL);
    const albumsData = data.data as TAlbum[];
    if (albumsData) {
      this.albums = albumsData.map((item) => new Album(item));
    } else {
      console.log("error");
    }
  }

  @action
  getAlbums() {
    return this.albums;
  }

  @action
  getAlbumsWithPhotos() {
    return this.albums.filter((album) => album.photos.length);
  }

  @action
  getAlbumsWithoutPhotos() {
    return this.albums.filter((album) => !album.photos.length);
  }

  @action
  getLatestAlbum(quantity: number) {
    return this.albums.slice(0, quantity);
  }

  @action
  getAlbum(id: Id) {
    return this.albums.find((album) => album.id === id);
  }

  async createAlbum(album: TAlbumCreate) {
    const data = await axios.post(ALBUM_API_URL, album);
    const albumData = data.data as TAlbum;
    if (albumData) {
      this.albums = [new Album(albumData), ...this.albums];
    } else {
      console.log("error");
    }
  }

  async updateAlbum(album: TAlbum) {
    const data = await axios.put(`${ALBUM_API_URL}/${album.id}`, album);
    const albumData = data.data as TAlbum;
    if (albumData) {
      const newAlbum = new Album(albumData);
      this.albums = this.albums.map((a) =>
        a.id === newAlbum.id ? newAlbum : a
      );
    } else {
      console.log("error");
    }
  }

  async deleteAlbum(album: Album) {
    const data = await axios.delete(`${ALBUM_API_URL}/${album.id}`);
    const albumData = data.data as TAlbum;
    if (albumData) {
      this.albums = this.albums.filter((n) => n.id !== albumData.id);
    } else {
      console.log("error");
    }
  }

  constructor() {
    makeObservable(this, {
      albums: observable,
      fetch: action,
      createAlbum: action,
      updateAlbum: action,
      deleteAlbum: action,
    });
    this.fetch();
  }
}

export const albumStore = new AlbumStore();
export const AlbumStoreContext = React.createContext(albumStore);
export const AlbumStoreProvider: React.FC<{}> = ({ children }) => {
  return (
    <AlbumStoreContext.Provider value={albumStore}>
      {children}
    </AlbumStoreContext.Provider>
  );
};
