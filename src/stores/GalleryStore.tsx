import React from "react";
import { format } from "date-fns";

import { action, makeObservable, observable } from "mobx";
import { DATE_FORMAT, DATE_TIME_FORMAT, Id } from "../models/Global";

import {
  TCreatePhotograph,
  TCreatePhotographAndImage,
  TPhotograph,
  TUpdatePhotographAndImage,
} from "../models/Photograph";
import { mockGallery } from "../mockData/Gallery";
import axios from "axios";
import { IMAGES_API_URL, PHOTOGRAPHS_API_URL } from "../models/const";

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

  async fetch() {
    const data = await axios.get(PHOTOGRAPHS_API_URL);
    const photographs = data.data as TPhotograph[];
    if (photographs) {
      this.photos = photographs.map((photograph) => new Photograph(photograph));
    } else {
      console.log("error");
    }
  }

  async createPhoto({ description, imageFile }: TCreatePhotographAndImage) {
    let formData = new FormData();
    formData.append("img", imageFile);
    const imageData = await axios.post(IMAGES_API_URL, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const path = imageData.data as string;
    console.log(path);
    if (path) {
      const photograph: TCreatePhotograph = {
        description,
        path: path,
      };
      const data = await axios.post(PHOTOGRAPHS_API_URL, photograph);
      const photographData = data.data as TPhotograph;
      console.log(photographData);
      if (photographData) {
        this.photos = [new Photograph(photographData), ...this.photos];
      } else {
        console.log("error photo");
      }
    } else {
      console.log("error image");
    }
  }

  @action
  async updatePhoto({
    id,
    description,
    path,
    imageFile,
  }: TUpdatePhotographAndImage) {
    console.log(id, description, path, imageFile);
    let formData = new FormData();
    formData.append("img", imageFile);
    const imageData = await axios.put(`${IMAGES_API_URL}/${path}`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const newPath = imageData.data as string;
    console.log(newPath);
    if (newPath) {
      const photograph: TCreatePhotograph = {
        description,
        path: newPath,
      };
      const data = await axios.put(`${PHOTOGRAPHS_API_URL}/${id}`, photograph);
      const photographData = data.data as TPhotograph;
      console.log(photographData);
      if (photographData) {
        const photo = new Photograph(photographData);
        this.photos = this.photos.map((p) => (p.id === photo.id ? photo : p));
      } else {
        console.log("error photo");
      }
    } else {
      console.log("error image");
    }
    // TODO: delete old image file
  }

  async removePhoto(photograph: Photograph) {
    const imageData = await axios.delete(
      `${IMAGES_API_URL}/${photograph.path}`
    );
    const path = imageData.data as string;
    console.log(path);
    if (path) {
      const data = await axios.delete(
        `${PHOTOGRAPHS_API_URL}/${photograph.id}`
      );
      const photographData = data.data as TPhotograph;
      console.log(photographData);
      if (photographData) {
        this.photos = this.photos.filter((p) => p.id !== photographData.id);
      } else {
        console.log("error photo");
      }
    } else {
      console.log("error image");
    }
  }

  @action
  getPhotos() {
    return this.photos as Photograph[];
  }

  constructor() {
    makeObservable(this, {
      photos: observable,
      fetch: action,
      createPhoto: action,
      updatePhoto: action,
      removePhoto: action,
    });
    this.fetch();
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
