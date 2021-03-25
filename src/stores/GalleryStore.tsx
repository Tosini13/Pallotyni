import React from "react";
import moment from "moment";

import { action, observable } from "mobx";
import { DATE_TIME_FORMAT, Id } from "../models/Global";

import { TCreatePhotograph, TPhotograph } from "../models/Photograph";
import { mockGallery } from "../mockData/Gallery";

export class Photograph {
  @observable
  id: Id;

  @observable
  createdAt: string;

  @observable
  path: string;

  @observable
  description: string;

  constructor({ id, createdAt, path, description }: TPhotograph) {
    this.id = id;
    this.createdAt = createdAt;
    this.path = path;
    this.description = description;
  }
}

export class PhotosStore {
  @observable
  photos: Photograph[] = [];

  @action
  createPhoto({ createdAt, description, path }: TCreatePhotograph) {
    console.dir({ createdAt, description, path });
    this.photos = [
      new Photograph({
        id: moment().format() + this.photos.length,
        path,
        description,
        createdAt,
      }),
      ...this.photos,
    ];
  }

  @action
  removePhoto(photograph: Photograph) {
    this.photos = this.photos.filter((p) => p.id !== photograph.id);
  }

  @action
  getPhotos() {
    return this.photos as Photograph[];
  }

  constructor() {
    mockGallery.forEach((mockPhoto) => {
      this.createPhoto({
        path: mockPhoto.path,
        description: mockPhoto.description,
        createdAt: moment().format(DATE_TIME_FORMAT),
      });
    });
  }
}

export const photosStore = new PhotosStore();
export const PhotosStoreContext = React.createContext(photosStore);
export const PhotosStoreProvider: React.FC<{}> = ({ children }) => {
  return (
    <PhotosStoreContext.Provider value={photosStore}>
      {children}
    </PhotosStoreContext.Provider>
  );
};
