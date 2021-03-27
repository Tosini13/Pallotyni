import React from "react";
import { format } from "date-fns";

import { action, observable } from "mobx";
import { DATE_FORMAT, DATE_TIME_FORMAT, Id } from "../models/Global";

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
    this.photos = [
      new Photograph({
        id: format(new Date(), DATE_FORMAT) + this.photos.length,
        path,
        description,
        createdAt,
      }),
      ...this.photos,
    ];
  }

  @action
  updatePhoto({ id, createdAt, description, path }: TPhotograph) {
    const photo = new Photograph({
      id,
      path,
      description,
      createdAt,
    });
    this.photos = this.photos.map((p) => (p.id === photo.id ? photo : p));
    // TODO: delete old image file
  }

  @action
  removePhoto(photograph: Photograph) {
    this.photos = this.photos.filter((p) => p.id !== photograph.id);
    // TODO: delete old image file
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
        createdAt: format(new Date(), DATE_TIME_FORMAT),
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
