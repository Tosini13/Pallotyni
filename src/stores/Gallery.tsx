import React from "react";
import moment from "moment";

import { action, observable } from "mobx";
import { DateFormat, Id } from "../models/Global";

import jack from "../images/mock/jack.jpg";
import bratislava from "../images/mock/bratislava.jpg";
import budapest from "../images/mock/budapest.jpg";
// import girne from "../../images/mock/girne.jpg";
// import lefkosa from "../../images/mock/lefkosa.jpg";
// import madrid from "../../images/mock/madrid.jpg";
// import touluse from "../../images/mock/touluse.jpg";
// import wien from "../../images/mock/wien.jpg";

export class Photograph {
  @observable
  createdAt: string;

  @observable
  path: string;

  @observable
  desciption: string;

  constructor(path: string, desciption: string) {
    this.createdAt = moment().format(DateFormat);
    this.path = path;
    this.desciption = desciption;
  }
}

type TPhotograph = {
  path: string;
  desciption: string;
};

export class PhotosStore {
  @observable
  private photos: Photograph[] = [];

  @action
  createPhoto(photo: Photograph) {
    this.photos = [photo, ...this.photos];
  }

  @action
  getPhotos() {
    return this.photos;
  }

  constructor() {
    this.createPhoto(new Photograph(jack, "Jack Sparrow"));
    this.createPhoto(new Photograph(bratislava, "Bratislava sewer"));
    this.createPhoto(new Photograph(budapest, "Budapest sewer"));
    console.log(this.photos);
    console.log(this.getPhotos());
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
