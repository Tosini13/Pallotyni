import React from "react";
import moment from "moment";

import { action, observable } from "mobx";
import { DateFormat, Id } from "../models/Global";

import { TPhotograph } from "../models/Photograph";
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
  createPhoto(photo: Photograph) {
    this.photos = [photo, ...this.photos];
  }

  @action
  getPhotos() {
    return this.photos as Photograph[];
  }

  constructor() {
    mockGallery.forEach((mockPhoto) => {
      this.createPhoto(
        new Photograph({
          id: moment().format() + this.photos.length,
          path: mockPhoto.path,
          description: mockPhoto.description,
          createdAt: moment().format(DateFormat),
        })
      );
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
